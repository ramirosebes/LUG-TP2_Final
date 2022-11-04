import { Router } from "express";
import { cartController } from "../../../controllers/Cart/cart";

const router = Router();

// url -> localhost:3001/api/cart/ metodo GET
router.get("/", cartController.getCart)

export default router;