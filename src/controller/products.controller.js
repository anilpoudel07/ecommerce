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
      (price === undefined || price === 0) &&
      (stock === undefined || stock === 0) &&
      description === undefined &&
      name === undefined
    ) {
      throw new ApiError(404, "All fields are required");
    }
    const avatarLocalPath = req.files?.image?.[0]?.path;
    console.log(avatarLocalPath);
    if (!avatarLocalPath) {
      throw new ApiError(400, "image are required");
    }
    const uploadedImage = await uploadCloudinary(avatarLocalPath);
    // const userID = req.user.id;
    console.log(uploadedImage);
    if (!uploadedImage) {
      throw new ApiError("400", "Image upload is failed");
    }
    const product = await Product.create({
      description,
      name,
      productImage: uploadedImage || "",
      price,
      stock,
      //  owner: userID,
    });
    const createdProduct = await Product.findById(product._id);
    console.log(createdProduct);
    return res.status(200).json(new ApiResponse("201", createdProduct));
  });
}

export const productCatalogue = new productCatalogueClass().productCatalogue;
