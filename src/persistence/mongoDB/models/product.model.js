import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);
