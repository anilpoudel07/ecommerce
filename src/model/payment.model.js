import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["SUCESS", "FAILED", "PENDING"],
      required: true,
    },
    paymentAmmount: {
      type: Number,
      default: 0,
      required: true,
    },
    gateway: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gateway",
    },
  },

  {
    timestamps: true,
  },
);
export const Payment = mongoose.model("Payment", paymentSchema);
