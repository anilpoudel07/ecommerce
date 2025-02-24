import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   streetNumber: { type: Number, required: true }, // ✅ Corrected
//   zipCode: { type: Number, required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
// });

const orderSchema = new mongoose.Schema(
  {
    orderPrice: { type: Number, required: true }, // ✅ Corrected
    phoneNo: { type: String, required: true },
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    orderItems: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    
    // address: addressSchema,
    state: {
      type: String,
      enum: ["PENDING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    }, // ✅ Corrected
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
