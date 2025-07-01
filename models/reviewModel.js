import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export const ReviewModel = mongoose.model("ReviewModel", reviewSchema);
