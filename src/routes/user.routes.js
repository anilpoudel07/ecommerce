import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { isuser } from "../middleware/role.middleware.js";
import { loginUser } from "../controller/user.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;
