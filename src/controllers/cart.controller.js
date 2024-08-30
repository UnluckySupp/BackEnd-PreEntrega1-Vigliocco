import cartServices from '../services/cart.services.js';
import { createTicket } from '../services/ticket.services.js';

const newCart = async (req, res) => {
  try {
    const cart = await cartServices.newCart();
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const findCartById = async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartServices.findCartById(idCart);
    res.status(200).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const putProductInCart = async (req, res) => {
  try {
    const { idProduct, idCart } = req.params;
    const { quantity } = req.body;
    const cart = await cartServices.putProductInCart(idProduct, idCart, Number(quantity));
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { idProduct, idCart } = req.params;
    const cart = await cartServices.deleteProductInCart(idProduct, idCart);
    if (cart.product === false) {
      res.status(404).json({ status: `Product ${cart.id} not found` });
    }
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateQuantityProductInCart = async (req, res) => {
  try {
    const { idCart, idProduct } = req.params;
    const { quantity } = req.body;
    const cartUpdate = await cartServices.updateQuantityProductInCart(idCart, idProduct, Number(quantity));
    res.status(200).json({ status: 'success', payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Internal error' });
  }
};

const deleteAllProductsInCart = async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartServices.deleteAllProductsInCart(idCart);
    res.status(201).json({ status: 'Success', payload: cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const purchaseController = async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartServices.findCartById(idCart);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Cart not Found' });
    const total = await cartServices.purchase(idCart);
    const ticket = await createTicket(total, req.user.email);
    return res.status(200).json({ status: 'Success', payload: ticket });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  newCart,
  findCartById,
  putProductInCart,
  deleteProductInCart,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
  purchaseController,
};
