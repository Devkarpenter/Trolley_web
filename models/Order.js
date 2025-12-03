import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    amount: Number,
    paymentMethod: { type: String, enum: ["COD", "UPI", "CARD"], default: "COD" },
    status: { type: String, default: "PROCESSING" },
    address: {
      fullName: String,
      phone: String,
      pincode: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      landmark: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
