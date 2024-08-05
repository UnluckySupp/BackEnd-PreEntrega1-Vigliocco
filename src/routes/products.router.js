import { Router } from 'express';
import { productCheck } from '../middlewares/productCheck.js';
import ProductManager from '../dao/mongoDB/product.dao.js';

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit, sort, page, category } = req.query;
    const filter = {
      limit: limit || 10,
      sort: { price: sort === 'asc' ? 1 : -1 },
      page: page || 1,
    };
    const query = {
      status: true,
    };
    category ? (query.category = category) : null;
    const products = await productManager.getProducts(query, filter);
    if (!products) res.status(404).json({ message: 'Products not found' });
    res.status(200).json({ status: 'Success', payload: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:idProduct', async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productManager.getProductById(idProduct);
    if (!product) res.status(404).json({ message: 'Product not found' });
    else res.status(200).json({ status: 'Success', payload: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', productCheck, async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const newProduct = await productManager.createProduct(product);
    res.status(201).json({ status: 'Success', payload: newProduct });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:idProduct', async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = req.body;
    const productUpdate = await productManager.updateProduct(idProduct, product);
    if (!productUpdate) res.status(404).json({ message: 'Error updating product.' });
    res.status(200).json({ status: 'Success', payload: productUpdate });
  } catch {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:idProduct', async (req, res) => {
  try {
    const { idProduct } = req.params;
    const productDelete = await productManager.deleteProduct(idProduct);
    if (!productDelete) res.status(404).json({ message: 'Error deleting product.' });
    res.status(200).send(`El producto ${idProduct} ha sido eliminado correctamente.`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
