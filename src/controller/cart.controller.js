import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/products.model.js";
class CartClass {
  constructor() {}
  addTocart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (
      userId === "" ||
      userId === undefined ||
      (productId === "" && productId === undefined) ||
      quantity === 0 ||
      quantity === undefined
    ) {
      throw new ApiError(400, "productId or quantity are required");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    if (product.stock < quantity) {
      throw new ApiError(400, `Only ${product.stock} is available in stock `);
    }
    console.log(product);
    const cart = await Cart.create({
      userId,
      productId,
      quantity,
    });

    const createdCart = await Cart.findById(cart._id);
    console.log(createdCart);

    return res
      .status(200)
      .json(
        new ApiResponse(201, { cartID: cart._id }, "Cart Sucessfully Created"),
      );
  });
}
const cartController = new CartClass().addTocart;
export { cartController };
