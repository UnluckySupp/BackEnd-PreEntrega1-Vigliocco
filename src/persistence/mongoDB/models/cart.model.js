import mongoose from 'mongoose';

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `products`,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
