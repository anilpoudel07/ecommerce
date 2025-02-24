import mongoose from "mongoose";

const gatewaySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true, // Store Razorpay's order ID
    },
    signature: {
      type: String,
      required: true, // Store Razorpay's payment signature
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Assuming you have a Payment model
    },
  },
  {
    timestams: true,
  }
);
export const Gateway = mongoose.model("Gateway", gatewaySchema);
