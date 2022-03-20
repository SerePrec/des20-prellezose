import { Router } from "express";
import {
  validateId,
  validatePostProductBody,
  validatePutProductBody
} from "../middlewares/validateApiData.js";
import * as controller from "../controllers/apiProductosController.js";

const router = Router();

router.get("/", controller.getAllProducts);

router.post("/", validatePostProductBody, controller.createProduct);

router.get("/:id", validateId, controller.getProduct);

router.put(
  "/:id",
  validateId,
  validatePutProductBody,
  controller.updateProduct
);

router.delete("/:id", validateId, controller.deleteProduct);

export default router;
