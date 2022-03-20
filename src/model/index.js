import MessagesFactoryDAO from "./DAOs/messages/MessagesFactoryDAO.js";
import ProductsFactoryDAO from "./DAOs/products/ProductsFactoryDAO.js";
import UsersFactoryDAO from "./DAOs/users/UsersFactoryDAO.js";
import config from "../config.js";
import { logger } from "../logger/index.js";

const productsDAO = await ProductsFactoryDAO.get();
const messagesDAO = await MessagesFactoryDAO.get();
const userDAO = await UsersFactoryDAO.get();

//Inicializo los DAOS
try {
  await productsDAO.init();
  await messagesDAO.init();
  await userDAO.init();
  logger.info(`Persistencia [${config.PERS}] inicializada`);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

export { productsDAO, messagesDAO, userDAO };

// FIXME: Info provisoria
// **************  PRUEBA  ****************
// ****************************************
// instancio otra vez para verificar
// que devuelven la misma instancia
const productsDAO2 = await ProductsFactoryDAO.get();
const messagesDAO2 = await MessagesFactoryDAO.get();
const userDAO2 = await UsersFactoryDAO.get();

console.log("\n******************* TEST SINGLETON *******************");
console.log(
  "ProductsDAO-Instancia1 = ProductsDAO-instancia2: ",
  productsDAO === productsDAO2
);
console.log(
  "MessagesDAO-Instancia1 = MessagesDAO-instancia2: ",
  messagesDAO === messagesDAO2
);
console.log(
  "UsersDAO-Instancia1 = UsersDAO-instancia2: ",
  userDAO === userDAO2
);
console.log("******************************************************\n");
// **************  PRUEBA  ****************
