import { cartModel } from './models/cart.model.js';
import ProductMaganer from './product.dao.js';

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
      const obtainedCart = await cartModel.findById(idCart);
      return obtainedCart;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  pushProductInCart = async (idCart, idProduct, newQuery) => {
    try {
      const cart = await cartModel.findById(idCart);
      if (!cart) throw new Error('El carrito no existe.');
      const product = await productManager.getProductById(idProduct);
      if (!product) throw new Error('El producto no existe.');
      const findedProduct = cart.products.find(p => p.product == idProduct);
      if (!findedProduct) {
        cart.products.push({ product: idProduct, quantity: newQuery });
      } else {
        findedProduct.quantity += newQuery;
      }
      cart.save();
      return cart;
    } catch (error) {
      console.error(`error: ${error}`);
    }
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

  updateByQuantity = async (idCart, idProduct, newQuery) => {
    try {
      const cart = await cartModel.findById(idCart);
      const findedProduct = cart.products.find(p => p.product == idProduct);
      if (!findedProduct) return { product: false, id: idProduct };
      findedProduct.quantity = newQuery;
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
