import { uploadCloudinary } from "../utils/cloudinary.js";
import { Product } from "../model/products.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upload } from "../middleware/multer.middleware.js";

class productCatalogueClass {
  constructor() {}

  productCatalogue = asyncHandler(async (req, res) => {
    const { description, name, price, stock } = req.body;
    if (
      [description, name].some((fields) => fields.trim() === "") &&
      (price === undefined || price === 0) &&
      (stock === undefined || stock === 0)
    ) {
      throw new ApiError(404, "All fields are required");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "images are required");
    }
    const uploadedImage = uploadCloudinary(avatarLocalPath);
    const userID = req.user.id;
    const product = await Product.create({
      description,
      name,
      productImage: uploadedImage?.url || "",
      price,
      stock,
      owner: userID,
    });
    const createdProduct = await Product.findById(product._id);
    console.log(createdProduct);
  });
}

export const productCatalogue = new productCatalogueClass().productCatalogue;
