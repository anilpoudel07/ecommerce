import asyncHandler from "../utils/asyncHandler.js";
import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/products.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

class OrderController {
  constructor() {}

  // Create a new order from cart
  createOrder = asyncHandler(async (req, res) => {
    const { cartId, userId, phone } = req.body;

    // Validate required fields
    if (!cartId || !userId || !phone) {
      throw new ApiError(400, "Cart ID, User ID, and Phone are required");
    }

    // Fetch and populate cart items with product details
    const cart = await Cart.findById(cartId).populate("product.productId");
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    let totalPrice = 0;
    const itemsWithPrice = [];

    for (const item of cart.product) {
      const product = item.productId;
      if (!product) {
        throw new ApiError(404, `Product ${item.productId} not found`);
      }

      // Calculate item total and update totalPrice
      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      // Store price snapshot for order
      itemsWithPrice.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      customer: userId,
      orderItems: itemsWithPrice,
      totalPrice,
      phoneNo: phone,
      state: "PENDING",
    });

    // Update product stock
    for (const item of cart.product) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    await Cart.findByIdAndDelete(cartId);

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order created successfully"));
  });
}

export const orderController = new OrderController().createOrder;
