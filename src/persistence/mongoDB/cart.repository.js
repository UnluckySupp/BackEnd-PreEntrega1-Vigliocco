import { cartModel } from './models/cart.model.js';
import ProductMaganer from './product.repository.js';

const productManager = new ProductMaganer();

export default class CartManager {
  createCart = async () => {
    try {
      const newCart = await cartModel.create({
        product: [],
      });
      return newCart;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };

  updateCart = async (id, prod) => {
    return await cartModel.findByIdAndUpdate(id, prod);
  };

  getAllCarts = async () => {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };

  getCartById = async idCart => {
    try {
      const obtainedCart = await cartModel.findOne({ _id: idCart });
      return obtainedCart;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  addProductInCart = async (idProduct, idCart, quantity) => {
    const cart = await cartModel.findOne({ _id: idCart });
    if (!cart) {
      throw new Error('El carrito no existe.');
    }
    const existingProduct = cart.products.find(prod => prod.product.toString() === idProduct.toString());
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: idProduct, quantity: quantity });
    }
    await cart.save();
    return cart;
  };

  updateQuantityProductInCart = async (idCart, idProduct, quantity) => {
    const cart = await cartModel.findById(idCart);
    const product = cart.products.find(i => i.product == idProduct);
    product.quantity = quantity;
    await cart.save();
    return cart;
  };

  deleteProductInCart = async (idCart, idProduct) => {
    try {
      const cart = await cartModel.findById(idCart);
      const product = cart.products.find(p => p.product == idProduct);
      if (!product) return { product: false, id: idProduct };
      cart.products = cart.products.find(p => p.product != idProduct);
      cart.save();
      return cart;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };

  deleteAllProductsInCart = async idCart => {
    try {
      const cart = await cartModel.findById(idCart);
      cart.products = [];
      cart.save();
      return cart;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };
}
