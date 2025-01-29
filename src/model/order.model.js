import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Corrected
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number, // ✅ Corrected
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  streetNumber: { type: Number, required: true }, // ✅ Corrected
  zipCode: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: { type: Number, required: true }, // ✅ Corrected
    phoneNo: { type: String, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ✅ Corrected
    orderItems: [orderItemSchema],
    address: addressSchema, // ✅ Corrected (nested schema, no `type:` needed)
    state: {
      type: String,
      enum: ["PENDING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    }, // ✅ Corrected
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
