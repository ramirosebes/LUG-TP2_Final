import { Router } from "express";
import productController from "../../../controllers/product";

const router = Router();

// url -> localhost:3001/api/cart/ metodo GET
router.get("/", productController.getProducts)
router.get("/specificproduct", productController.getSpecificProduct) //localhost:3001/api/product/specificproduct

export default router;