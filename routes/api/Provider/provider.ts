import { Router } from "express";
import providerController from "../../../controllers/provider";

const router = Router();

// url -> localhost:3001/api/cart/ metodo GET
router.get("/", providerController.getProvider)

export default router;