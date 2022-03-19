import mongoose from "mongoose";
import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";

const { Schema } = mongoose;

const messageSchema = new Schema({
  author: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

class MessagesDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super("Message", messageSchema);
  }
}

export default MessagesDAOMongoDB;
