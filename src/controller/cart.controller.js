import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../model/cart.model.js";

class CartClass {
  constructor() {}
  addTocart = asyncHandler(async (req, res) => {
    const {
      userId,
      productId,
      // quantity,
    } = req.body;
    // const userId = req.userId;
    console.log(userId);
    if (
      userId === "" &&
      userId === undefined &&
      productId === "" &&
      productId === undefined
      // &&
      // quantity === 0 &&
      // quantity === undefined
    ) {
      throw new ApiError(400, "productId or quantity are required");
    }


    const cart = await Cart.create({
      userId,
      productId,
      // quantity,
    });

    const createdCart = Cart.findById(cart._id);
    console.log(createdCart);

    return res.status(201).json(new ApiResponse(201, cart));
  });
}
const cartController = new CartClass().addTocart;
export { cartController };
