import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    pincode: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    landmark: String,
  },
  { _id: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, default: null },
    role: { type: String, default: "user" },
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
