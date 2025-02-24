import { Router } from "express";
import { orderItemController } from "../controller/orderItem.controller.js";
import { isuser } from "../middleware/role.middleware.js";
const router = Router();
console.log("Welcome to order Router");
router.route("/order").post(orderItemController);
// isuser, 
export default router;
