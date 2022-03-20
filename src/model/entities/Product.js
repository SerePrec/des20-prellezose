import Joi from "joi";

export class Product {
  _title;
  _price;
  _thumbnail;

  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  static validate(product, requerido) {
    const ProductSchema = Joi.object({
      title: requerido ? Joi.string().required() : Joi.string(),
      price: requerido
        ? Joi.number().positive().required()
        : Joi.number().positive(),
      thumbnail: requerido ? Joi.string().required() : Joi.string()
    });
    const { error, value } = ProductSchema.validate(product);
    if (error) {
      console.log(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    const { error } = Joi.string().required().validate(title);
    if (error) {
      throw new Error(`title: ${error.message}`);
    }
    this._title = title;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    const { error } = Joi.number().positive().required().validate(price);
    if (error) {
      throw new Error(`price: ${error.message}`);
    }
    this._price = price;
  }

  get thumbnail() {
    return this._thumbnail;
  }

  set thumbnail(thumbnail) {
    const { error } = Joi.string().required().validate(thumbnail);
    if (error) {
      throw new Error(`thumbnail: ${error.message}`);
    }
    this._thumbnail = thumbnail;
  }
}

export class ProductWithId extends Product {
  _id;
  constructor({ id, title, price, thumbnail }) {
    super({ title, price, thumbnail });
    this.id = id;
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
}
