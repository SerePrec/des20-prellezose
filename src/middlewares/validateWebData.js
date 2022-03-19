import * as validateDataService from "../services/validateDataService.js";

// Valida que sea un formato de usuario válido para guardar en la BD
const validateRegisterPost = (req, res, next) => {
  const { username, password } = req.body;
  if (validateDataService.validateRegisterPost(username, password)) {
    next();
  } else {
    res.redirect("/register");
  }
};

export { validateRegisterPost };
