import Joi from "joi";

export class Message {
  _text;
  _author;

  constructor({ text, author }) {
    this.text = text;
    this.author = author;
  }

  static validate(message, requerido) {
    const AuthorSchema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      age: Joi.number().integer().positive().required(),
      alias: Joi.string().required(),
      avatar: Joi.string().required()
    });
    const MessageSchema = Joi.object({
      text: requerido ? Joi.string().required() : Joi.string(),
      author: requerido ? AuthorSchema.required() : AuthorSchema
    });
    const { error, value } = MessageSchema.validate(message);
    if (error) {
      console.log(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    const { error } = Joi.string().required().validate(text);
    if (error) {
      throw new Error(`text: ${error.message}`);
    }
    this._text = text;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    const AuthorSchema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      age: Joi.number().integer().positive().required(),
      alias: Joi.string().required(),
      avatar: Joi.string().required()
    });

    const { error } = AuthorSchema.validate(author);
    if (error) {
      throw new Error(`author: ${error.message}`);
    }
    this._author = author;
  }
}

export class MessageWithId extends Message {
  _id;
  _timestamp;
  constructor({ id, text, author, timestamp }) {
    super({ text, author });
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
