import config from "../../../config.js";

class UsersFactoryDAO {
  static async get() {
    switch (config.PERS) {
      case "file": {
        const { default: UsersDAOFS } = await import("./UsersDAOFS.js");
        return new UsersDAOFS();
      }
      case "mongodb":
      case "mongodb_atlas": {
        const { default: UsersDAOMongoDB } = await import(
          "./UsersDAOMongoDB.js"
        );
        return new UsersDAOMongoDB();
      }
      case "mem":
      default: {
        const { default: UsersDAOMem } = await import("./UsersDAOMem.js");
        return new UsersDAOMem();
      }
    }
  }
}

export default UsersFactoryDAO;
