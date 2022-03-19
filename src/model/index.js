import MessagesDAOMongoDB from "./DAOs/messages/MessagesDAOMongoDB.js";
import ProductsDAOMongoDB from "./DAOs/products/ProductsDAOMongoDB.js";
import UsersDAOMongoDB from "./DAOs/users/UsersDAOMongoDB.js";

// ELECCIÓN DE PERSISTENCIA: MONGODB ****************
// **************************************************

const productsModel = new ProductsDAOMongoDB();
const messagesModel = new MessagesDAOMongoDB();
const userModel = new UsersDAOMongoDB();

export { productsModel, messagesModel, userModel };
