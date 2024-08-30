import CartManager from '../persistence/mongoDB/cart.repository.js';
import productsServices from './products.services.js';

const cartManager = new CartManager();

const newCart = async () => {
  return await cartManager.createCart();
};

const findCartById = async idCart => {
  return await cartManager.getCartById(idCart);
};

const putProductInCart = async (idCart, idProduct, newQuery = 1) => {
  const cart = await cartManager.addProductInCart(idCart, idProduct, newQuery);
  return cart;
};

const deleteProductInCart = async (idCart, idProduct) => {
  return await cartManager.deleteProductInCart(idCart, idProduct);
};

const updateQuantityProductInCart = async (idCart, idProduct, quantity) => {
  return await cartManager.updateQuantityProductInCart(idCart, idProduct, quantity);
};

const deleteAllProductsInCart = async idCart => {
  return await cartManager.deleteAllProductsInCart(idCart);
};

const purchase = async id => {
  const cart = await findCartById(id);
  let total = 0;
  let productsWithOutStock = [];
  for (const i of cart.products) {
    const findedProduct = await productsServices.getProductById(i.product);
    if (findedProduct.stock >= i.quantity) {
      total += findedProduct.price * i.quantity;
      await productsServices.updateProduct(findedProduct._id, { stock: findedProduct.stock - i.quantity });
    } else {
      productsWithOutStock.push(i);
    }
    await cartManager.updateCart(id, { products: productsWithOutStock });
  }
  return total;
};

export default {
  newCart,
  findCartById,
  putProductInCart,
  deleteProductInCart,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
  purchase,
};
