import mongoose from 'mongoose';

const productCollection = 'products';
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  code: { type: String, index: true },
  status: { type: Boolean, default: true },
});

export const productModel = mongoose.model(productCollection, productSchema);
