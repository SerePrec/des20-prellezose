import { userDAO as userModel } from "../model/index.js";
import { createHash, isValidPassword } from "../utils/crypt.js";
import { logger } from "../logger/index.js";

const verifyRegister = async (customObject, username, password, done) => {
  try {
    const user = await userModel.getByUsername(username);
    if (user) {
      return done(null, false, {
        message: "El nombre de usuario ya existe"
      });
    }
    const newUser = {
      username,
      password: createHash(password)
    };
    const newUserAdded = await userModel.save(newUser);
    logger.info(`Usuario registrado con éxito con id ${newUserAdded.id}`);
    return done(null, newUserAdded);
  } catch (error) {
    logger.error("Error al registrar usuario: ", error);
    done(error);
  }
};

const verifyLogin = async (username, password, done) => {
  try {
    const user = await userModel.getByUsername(username);
    if (!user) {
      return done(null, false, {
        message: "Nombre de usuario y/o contraseña incorrectos"
      });
    }
    if (!isValidPassword(user, password)) {
      return done(null, false, {
        message: "Nombre de usuario y/o contraseña incorrectos"
      });
    }
    logger.info("Usuario logueado con éxito");
    return done(null, user);
  } catch (error) {
    logger.error("Error al loguear usuario: ", error);
    done(error);
  }
};

const serializeUser = (user, done) => done(null, user.id);

const deserializeUser = async (id, done) => {
  try {
    const user = await userModel.getById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

export { verifyLogin, verifyRegister, serializeUser, deserializeUser };
