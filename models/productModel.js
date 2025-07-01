import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  rating: Number
}, {timestamps: true});

export const ProductModel = mongoose.model("ProductModel", productSchema);
