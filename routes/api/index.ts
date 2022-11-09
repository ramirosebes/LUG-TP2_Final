import { Router } from "express";
import cartRouter from "../api/cart/index";
import productRouter from "../api/product/index"
import productDetailRouter from "../api/ProductDetail/productDetail"

const router = Router();

router.use("/cart", cartRouter)
router.use("/product", productRouter)
router.use("/productDetail", productDetailRouter)

export default router;