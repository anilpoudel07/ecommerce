import { Router } from "express";
import getProductItem from "../controller/admin.controller.js";
import { productCatalogue } from "../controller/products.controller.js";
import { isvendor } from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/products").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),

  productCatalogue,
);
router.route("/products").get(getProductItem);
export default router;
