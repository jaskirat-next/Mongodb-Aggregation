import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String,
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)