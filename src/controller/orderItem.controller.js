import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../model/order.model.js";
//import Product from "../model/products.model.js"

class OrderClass {
  constructor() {}

  orderItem = asyncHandler(async (req, res) => {
    console.log(req.body);
    // const { orderPrice, phoneNo, customer, orderItems, address } = req.body;
    const { orderPrice, phoneNo, orderItems } = req.body;

    if (
      // [orderPrice, phoneNo, customer, orderItems, address].some(
      [orderPrice, phoneNo, orderItems].some(
        (field) => field === "" || field === null || field === undefined
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const order = await Order.create({
      orderPrice,
      phoneNo,
      // customer,
      orderItems,
      // address,
    });

    console.log("Order is created", order);
    const createdOrder = await Order.findById(order._id);
    if (!createdOrder) {
      throw new ApiError(500, "Something went wrong while placing a order.");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, createdOrder, "Order are placed sucessfully"));
  });
  getorderItem = asyncHandler(async (req, res) => {});
}

export const orderItemController = new OrderClass().orderItem;
export const getOrderItem = new OrderClass().getorderItem;
