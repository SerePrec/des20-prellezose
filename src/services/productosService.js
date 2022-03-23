import ProductsRepository from "../repositories/ProductsRepository.js";
import { Product } from "../model/entities/Product.js";
import { ProductDTO } from "../model/DTOs/ProductDTO.js";

const productsModel = new ProductsRepository();

export const getAllProducts = async () => {
  const productEntities = await productsModel.getAll();
  const products = productEntities.map(product => new ProductDTO(product));
  return products;
};

export const createProduct = async newProductData => {
  const newProductEntitie = new Product(newProductData);
  const createdProductEntitie = await productsModel.save(newProductEntitie);
  return new ProductDTO(createdProductEntitie);
};

export const getProduct = async id => {
  const productEntitie = await productsModel.getById(id);
  return productEntitie ? new ProductDTO(productEntitie) : productEntitie;
};

export const updateProduct = async (id, updateData) => {
  const updatedProductEntitie = await productsModel.updateById(id, updateData);
  return updatedProductEntitie
    ? new ProductDTO(updatedProductEntitie)
    : updatedProductEntitie;
};

export const deleteProduct = async id => {
  const deletedId = await productsModel.deleteById(id);
  return deletedId;
};
