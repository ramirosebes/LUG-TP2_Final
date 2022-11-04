import { Router } from "express";
import cartRouter from "../api/cart/index";

const router = Router();

router.use("/cart", cartRouter)

export default router;