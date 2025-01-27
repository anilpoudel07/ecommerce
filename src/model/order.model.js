import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const addressSchema = new mongoose.Schema({
  streetNumber: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchema,
    },
    orderItems: {
      type: -[orderItemSchema],
    },
    address: {
      type: mongoose.Schma.Types.ObjectId,
      ref: "addressSchema",
    },
    state: {
      type: String,
      enum: ["PENDING", "DELIVERD", "CANCLLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);
export const Order = mongoose.model("Order", orderSchema);
