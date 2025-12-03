import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  oldPrice: Number,
  category: String,
  brand: String,
  image: String,
  inStock: Boolean,
  rating: Number
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
