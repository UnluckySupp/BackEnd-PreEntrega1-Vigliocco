import cartServices from '../services/cart.services.js';
import productsServices from '../services/products.services.js';

export const checkProdAndCart = async (req, res, next) => {
  try {
    const { idCart, idProduct } = req.params;
    const findedCart = await cartServices.findCartById(idCart);
    if (!findedCart) return res.status(404).json({ status: 'error', message: 'Cart not Found' });
    const findedProduct = await productsServices.getProductById(idProduct);
    if (!findedProduct) return res.status(404).json({ status: 'error', message: 'Product not Found' });
    next();
  } catch (error) {
    throw new Error(error);
  }
};
