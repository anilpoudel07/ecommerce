import { Router } from "express";
import { cartController } from "../controller/cart.controller.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
const router = Router();
console.log("Welcome to cart route");
router.route("/cart").post(cartController);
// authenticate,
export default router;
