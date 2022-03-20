import Joi from "joi";

export class User {
  _username;
  _password;

  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  static validate(user, requerido) {
    const UserSchema = Joi.object({
      username: requerido ? Joi.string().required() : Joi.string(),
      password: requerido ? Joi.string().required() : Joi.string()
    });
    const { error, value } = UserSchema.validate(user);
    if (error) {
      console.log(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    const { error } = Joi.string().required().validate(username);
    if (error) {
      throw new Error(`username: ${error.message}`);
    }
    this._username = username;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    const { error } = Joi.string().required().validate(password);
    if (error) {
      throw new Error(`password: ${error.message}`);
    }
    this._password = password;
  }
}

export class UserWithId extends User {
  _id;
  _timestamp;
  constructor({ id, username, password, timestamp }) {
    super({ username, password });
    this.id = id;
    this.timestamp = timestamp;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    const { error } = Joi.required().validate(id);
    if (error) {
      throw new Error(`id: ${error.message}`);
    }
    this._id = id;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    const { error } = Joi.date().iso().required().validate(timestamp);
    if (error) {
      throw new Error(`id: ${error.message}`);
    }
    this._timestamp = timestamp;
  }
}
