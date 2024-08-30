import productsServices from '../services/products.services.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productsServices.getAllProducts(req.query);
    if (!products) res.status(404).json({ message: 'Products not found' });
    res.status(200).json({ status: 'Success', payload: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productsServices.getProductById(idProduct);
    if (!product) res.status(404).json({ message: 'Product not found' });
    else res.status(200).json({ status: 'Success', payload: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.createProduct(product);
    res.status(201).json({ status: 'Success', payload: newProduct });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const { product } = req.body;
    const productUpdate = await productsServices.updateProduct(idProduct, product);
    if (!productUpdate) res.status(404).json({ message: 'Error updating product.' });
    res.status(200).json({ status: 'Success', payload: productUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const productDelete = await productsServices.deleteProduct(idProduct);
    if (!productDelete) res.status(404).json({ message: 'Error deleting product.' });
    res.status(200).send(`El producto ${idProduct} ha sido eliminado correctamente.`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
