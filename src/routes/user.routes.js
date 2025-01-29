import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { isuser } from "../middleware/role.middleware.js";
const router = Router();

router.route("/register").post(registerUser);

export default router;
