import { Product } from "../model/entities/Product.js";
import { User } from "../model/entities/User.js";

// Valida que sea un id numérico
const validateId = id => {
  if (!((typeof id == "string" || typeof id == "number") && /^\w+$/.test(id)))
    return { error: "El parámetro no es válido" };
  else return true;
};

//Valida que el formato de datos a guardar sea válido
const validatePostProductBody = (title, price, thumbnail) => {
  const validProduct = Product.validate({ title, price, thumbnail }, true);
  return validProduct
    ? validProduct
    : { error: "Los valores enviados no son válidos" };
};

//Valida que el formato de datos a actualizar sea válido
const validatePutProductBody = (title, price, thumbnail) => {
  const validData = Product.validate({ title, price, thumbnail });
  if (!validData) return { error: "Los valores enviados no son válidos" };
  else if (title === undefined && price === undefined && thumbnail == undefined)
    return {
      error: "No hay campos válidos para actualizar"
    };
  else {
    return validData;
  }
};

// Valida que sea un formato de usuario válido para guardar en la BD
const validateRegisterPost = (username, password) => {
  return User.validate({ username, password }, true) ? true : false;
};

export {
  validateId,
  validatePostProductBody,
  validatePutProductBody,
  validateRegisterPost
};
