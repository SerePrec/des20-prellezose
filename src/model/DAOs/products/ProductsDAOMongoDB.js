import mongoose from "mongoose";
import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true }
});
class ProductsDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super("Product", productSchema);
  }
}

export default ProductsDAOMongoDB;
