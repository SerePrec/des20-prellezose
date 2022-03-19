import * as testsService from "../services/testsService.js";

export const getProductosTest = (req, res) => {
  res.json(testsService.generateNMockProduct(5));
};
