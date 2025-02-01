import Router from "express";
import adminController from "../controller/admin.controller.js";
const router = Router();
router.route("/admin").post(adminController);
export default router;
