import { Router } from "express";
import productDetailController from "../../../controllers/productDetail";

const router = Router();

// url -> localhost:3001/api/cart/ metodo GET
router.get("/", productDetailController.getProductDetail)

export default router;