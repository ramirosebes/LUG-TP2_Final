import { Router } from "express";
import cartRouter from "../api/cart/index";
import productRouter from "../api/product/index"
import productDetailRouter from "../api/ProductDetail/productDetail"
import providerRouter from "../api/Provider/provider"

const router = Router();

router.use("/cart", cartRouter)
router.use("/product", productRouter)
router.use("/productDetail", productDetailRouter)
router.use("/provider", providerRouter)

export default router;