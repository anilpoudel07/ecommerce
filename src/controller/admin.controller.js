import { Product } from "../model/products.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  console.log(`All the Product viewed By admin ${product}`);
  res.status(200).json(new ApiResponse(201, product));
});

export default getAllProduct;
