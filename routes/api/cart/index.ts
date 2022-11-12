import { Router } from "express";
import { cartController } from "../../../controllers/cart";

const router = Router();

// url -> localhost:3001/api/cart/ metodo GET
router.get("/", cartController.getCart)
router.post("/", cartController.addProduct)
router.delete("/", cartController.deleteProduct)
router.get("/pruebas", cartController.pruebasCart)

export default router;