import mongoose from "mongoose";
import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";
import { deepClone, renameField } from "../../../utils/dataTools.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

class UsersDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super("User", userSchema);
  }
  async getByUsername(username) {
    try {
      let element = await this.CollModel.findOne({ username }, { __v: 0 });
      return element ? renameField(deepClone(element), "_id", "id") : null;
    } catch (error) {
      throw new Error(
        `Error al obtener el elemento con username: '${username}': ${error}`
      );
    }
  }
}

export default UsersDAOMongoDB;
