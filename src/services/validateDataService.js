// Valida que sea un id numérico
const validateId = id => {
  if (!((typeof id == "string" || typeof id == "number") && /^\w+$/.test(id)))
    return { error: "El parámetro no es válido" };
  else return true;
};

//Valida que el formato de datos a guardar sea válido
const validatePostProductBody = (title, price, thumbnail) => {
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
  )
    return { error: "Los valores enviados no son válidos" };
  else {
    title = title.trim();
    price = Math.round(parseFloat(price) * 100) / 100;
    thumbnail = thumbnail.trim();
    return { title, price, thumbnail };
  }
};

//Valida que el formato de datos a actualizar sea válido
const validatePutProductBody = (title, price, thumbnail) => {
  if (
    (title !== undefined && !(typeof title == "string" && /\w+/.test(title))) ||
    (price !== undefined &&
      !(
        (typeof price == "string" || typeof price == "number") &&
        /^\d+(\.\d+)?$/.test(price)
      )) ||
    (thumbnail !== undefined &&
      !(
        typeof thumbnail == "string" &&
        /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
      ))
  )
    return { error: "Los valores enviados no son válidos" };
  else if (title === undefined && price === undefined && thumbnail == undefined)
    return {
      error: "No hay campos válidos para actualizar"
    };
  else {
    title = title?.trim();
    price = price && Math.round(parseFloat(price) * 100) / 100;
    thumbnail = thumbnail?.trim();
    return { title, price, thumbnail };
  }
};

// Valida que sea un formato de usuario válido para guardar en la BD
const validateRegisterPost = (username, password) => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      username
    ) ||
    !(typeof password === "string" && password.length >= 6)
  )
    return false;
  else return true;
};

export {
  validateId,
  validatePostProductBody,
  validatePutProductBody,
  validateRegisterPost
};
