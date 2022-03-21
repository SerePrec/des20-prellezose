import { logger } from "../../logger/index.js";

class BaseDAOMem {
  constructor(DTO) {
    this.elements = [];
    this.nextId = 1;
    this.DTO = DTO;
  }

  //No tiene funcionalidad pero es para mantener las mismas interfaces
  init() {}

  //Obtengo todos los elementos
  getAll() {
    return this.elements.map(element => new this.DTO(element));
  }

  //Obtengo un elemento por su id
  getById(id) {
    id = parseInt(id);
    const match = this.elements.find(elem => elem.id === id);
    return match ? new this.DTO(match) : null;
  }

  //Guardo el elemento
  save(data) {
    const id = this.nextId;
    const timestamp = new Date().toISOString();
    const element = { ...data, id, timestamp };
    this.elements.push(element);
    this.nextId++;
    logger.debug("Elemento guardado con éxito");
    return new this.DTO(element);
  }

  //actualizo un elemento por su id
  updateById(id, data) {
    id = parseInt(id);
    const match = this.elements.find(elem => elem.id === id);
    if (match) {
      for (const key in data) {
        if (!data[key]) data[key] = match[key];
      }
      const newElement = { ...match, ...data };
      const newContent = this.elements.map(elem =>
        elem.id !== id ? elem : newElement
      );
      this.elements = newContent;
      logger.debug(`El elemento con id: ${id} se actualizó con éxito`);
      return new this.DTO(newElement);
    } else {
      logger.debug(`No se encontró el elemento con el id: ${id}`);
      return null;
    }
  }

  //borro todos los elementos
  deleteAll() {
    this.elements = [];
  }

  //borro un elemento por su id
  deleteById(id) {
    id = parseInt(id);
    const match = this.elements.find(elem => elem.id === id);
    if (match) {
      const newContent = this.elements.filter(elem => elem.id !== id);
      this.elements = newContent;
      logger.debug(`El elemento con id: ${id} se eliminó con éxito`);
      return id;
    } else {
      logger.debug(`No se encontró el elemento con el id: ${id}`);
      return null;
    }
  }
}

export default BaseDAOMem;
