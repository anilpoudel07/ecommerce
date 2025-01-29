import { Router } from "express";
import { productCatalogue } from "../controller/products.controller.js";
import { isvendor } from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/products").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),

  isvendor,
  productCatalogue,
);
export default router;
