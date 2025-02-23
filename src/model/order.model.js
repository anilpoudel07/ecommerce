import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    phoneNo: { type: String, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: { type: Number, default: 0 },
    state: {
      type: String,
      enum: ["PENDING", "SHIPPED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);
export const Order = mongoose.model("Order", orderSchema);
