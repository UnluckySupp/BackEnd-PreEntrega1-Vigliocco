import { Router } from 'express';
import { productCheck } from '../middlewares/productCheck.js';
import productsController from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:idProduct', productsController.getProductById);
router.post('/', passport.authenticate('jwt'), authMiddleware('admin'), productCheck, productsController.createProduct);
router.put('/:idProduct', passport.authenticate('jwt'), authMiddleware('admin'), productsController.updateProduct);
router.delete('/:idProduct', passport.authenticate('jwt'), authMiddleware('admin'), productsController.deleteProduct);

export default router;
