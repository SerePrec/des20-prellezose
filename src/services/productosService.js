import { productsDAO as productsModel } from "../model/index.js";

export const getAllProducts = async () => {
  const lista = await productsModel.getAll();
  return lista;
};

export const createProduct = async newProduct => {
  const createdProduct = await productsModel.save(newProduct);
  return createdProduct;
};

export const getProduct = async id => {
  const product = await productsModel.getById(id);
  return product;
};

export const updateProduct = async (id, updateProduct) => {
  const updatedProduct = await productsModel.updateById(id, updateProduct);
  return updatedProduct;
};

export const deleteProduct = async id => {
  const deletedId = await productsModel.deleteById(id);
  return deletedId;
};
