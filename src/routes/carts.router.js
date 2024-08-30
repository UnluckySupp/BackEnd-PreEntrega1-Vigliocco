import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from 'passport';
import { checkProdAndCart } from '../middlewares/checkProdAndCart.middleware.js';

const router = Router();

router.post('/', cartController.newCart);
router.get('/:idCart', cartController.findCartById);
router.post('/:idCart/product/:idProduct', authMiddleware('user'), checkProdAndCart, cartController.putProductInCart);
router.delete(`/:idCart/product/:idProduct`, checkProdAndCart, cartController.deleteProductInCart);
router.put(
  '/:idCart/product/:idProduct',
  passport.authenticate('jwt'),
  authMiddleware('user'),
  checkProdAndCart,
  cartController.updateQuantityProductInCart
);
router.delete(`/:idCart`, cartController.deleteAllProductsInCart);
router.get(
  '/:idCart/purchase',
  passport.authenticate('jwt'),
  authMiddleware('user'),
  cartController.purchaseController
);

export default router;
