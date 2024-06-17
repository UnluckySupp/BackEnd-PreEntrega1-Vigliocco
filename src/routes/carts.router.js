import { Router } from 'express';
import CartManager from '../dao/mongoDB/cart.dao.js';

const carts = Router();
const cartManager = new CartManager();

carts.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

carts.get('/:idCart', async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartManager.getCartById(idCart);
    console.log(cart);
    res.status(200).json({ status: 'Success', payload: cart });
  } catch (error) {
    console.error(error);
  }
});

carts.post('/:idCart/product/:idProduct', async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    const { quantity } = req.body;
    const newQuery = quantity ? quantity : 1;
    const cart = await cartManager.pushProductInCart(idCart, idProduct, newQuery);
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    next(error);
  }
});

carts.delete(`/:idCart/product/:idProduct`, async (req, res) => {
  try {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    const cart = await cartManager.deleteProductInCart(idCart, idProduct);
    if (cart.product === false) {
      res.status(404).json({ status: `Product ${cart.id} not found` });
    }
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    console.error(error);
  }
});

carts.put(`/:idCart/product/:idProduct`, async (req, res) => {
  try {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    const { quantity } = req.body;
    const newQuery = quantity ? quantity : 1;
    const cart = await cartManager.updateByQuantity(idCart, idProduct, newQuery);
    if (cart.product === false) {
      res.status(404).json({ status: `Product doesn't exist in the cart` });
    }
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    console.error(error);
  }
});

carts.delete(`/:idCart`, async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartManager.deleteAllProductsInCart(idCart);
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    console.error(error);
  }
});

export default carts;
