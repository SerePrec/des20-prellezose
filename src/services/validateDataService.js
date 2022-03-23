import { Product } from "../model/entities/Product.js";
import { Message } from "../model/entities/Message.js";
import { User } from "../model/entities/User.js";

// Valida que sea un id numérico
const validateId = id => {
  if (!((typeof id == "string" || typeof id == "number") && /^\w+$/.test(id)))
    return { error: "El parámetro no es válido" };
  else return true;
};

//Valida que el formato de datos a guardar sea válido
const validatePostProductBody = data => {
  const validProduct = Product.validate(data, true);
  return validProduct
    ? validProduct
    : { error: "El formato de datos o los valores enviados no son válidos" };
};

//Valida que el formato de datos a actualizar sea válido
const validatePutProductBody = data => {
  const validData = Product.validate(data);
  if (!validData)
    return {
      error: "El formato de datos o los valores enviados no son válidos"
    };
  else if (Object.keys(validData)?.length === 0)
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

// Valida que sea un formato de mensaje válido para guardar en la BD
const validateMessage = data => {
  const validMessage = Message.validate(data, true);
  return validMessage
    ? validMessage
    : { error: "El formato de datos o los valores enviados no son válidos" };
};

export {
  validateId,
  validatePostProductBody,
  validatePutProductBody,
  validateRegisterPost,
  validateMessage
};
