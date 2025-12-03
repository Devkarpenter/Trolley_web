import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },    // ✔ correct field
  description: String,
  price: Number,
  emoji: String                             // ✔ you used emoji in DB
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
