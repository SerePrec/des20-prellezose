import {
  productsDAO as productsModel,
  messagesDAO as messagesModel
} from "./model/index.js";
import { escapeHtml, normalizeMessages } from "./utils/messageTools.js";
import { logger } from "./logger/index.js";

//Configuración de sockets
export default io => {
  io.on("connection", async socket => {
    const socketId = socket.id;
    //let now = new Date().toLocaleTimeString();
    logger.debug(
      `Cliente socket conectado con id: ${socketId}\n** Conexiones websocket activas: ${io.engine.clientsCount} **`
    );

    //Obtiene listado de productos con cada conexión entrante y lo envía al socket
    try {
      const list = await productsModel.getAll();
      socket.emit("allProducts", list);
    } catch (error) {
      logger.error(error);
      socket.emit("productErrors", "No se pudo recuperar archivo de productos");
    }

    // Envio a todos los sockets la cantidad de usuarios conectados con cada conexión
    //   io.sockets.emit("usersCount", io.engine.clientsCount);

    //Obtiene listado de mensajes con cada conexión entrante y lo envía al socket
    try {
      const messages = await messagesModel.getAll();
      const normalizedMessages = normalizeMessages(messages);
      socket.emit("allMessages", normalizedMessages);
    } catch (error) {
      logger.error(error);
      socket.emit("messageErrors", "No se pudo recuperar archivo de mensajes");
    }

    //Escucha el evento de guardar un nuevo producto
    socket.on("saveProduct", async product => {
      try {
        const newProduct = validateProductData(product);
        if (newProduct) {
          await productsModel.save(newProduct);
          const list = await productsModel.getAll();
          io.sockets.emit("allProducts", list);
        }
      } catch (error) {
        logger.error(error);
        socket.emit("productErrors", "No se pudo agregar el producto");
      }
    });

    //Escucha el evento de un nuevo mensaje enviado
    socket.on("newMessage", async message => {
      try {
        if (!message.author || !message.text.trim())
          throw new Error("Mensaje inválido");

        message.text = escapeHtml(message.text);
        const newMessage = { ...message };
        await messagesModel.save(newMessage);
        const messages = await messagesModel.getAll();
        const normalizedMessages = normalizeMessages(messages);
        io.sockets.emit("allMessages", normalizedMessages);
      } catch (error) {
        logger.error(error);
        socket.emit("messageErrors", "Error al procesar el mensaje enviado");
      }
    });

    // Actualizo la cantidad de usuarios conectados con cada desconexión y la mustro por consola.
    socket.on("disconnect", () => {
      //now = new Date().toLocaleTimeString();
      logger.debug(
        `** Conexiones websocket activas: ${io.engine.clientsCount} **`
      );
      //io.sockets.emit("usersCount", io.engine.clientsCount);
    });

    //Valida los datos del producto que se va a cargar
    function validateProductData(data) {
      let { title, price, thumbnail } = data;
      if (
        !(typeof title == "string" && /\w+/.test(title)) ||
        !(
          (typeof price == "string" || typeof price == "number") &&
          /^\d+(\.\d+)?$/.test(price)
        ) ||
        !(
          typeof thumbnail == "string" &&
          /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
        )
      ) {
        socket.emit("productErrors", "Los valores enviados no son válidos");
        return false;
      } else {
        title = title.trim();
        price = Math.round(parseFloat(price) * 100) / 100;
        thumbnail = thumbnail.trim();
        return { title, price, thumbnail };
      }
    }
  });

  //Cambié a esta forma de actualizar los usuarios conectados para ser compatible con el modo cluster. Así cada x seg cada servidro worker envía los usuarios que tiene conectados y en el front se procesa el conjunto de infomación
  setInterval(() => {
    io.sockets.emit("usersCount", io.engine.clientsCount);
  }, 3000);
};
