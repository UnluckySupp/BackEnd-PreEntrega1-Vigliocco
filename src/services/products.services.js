import ProductMaganer from '../persistence/mongoDB/product.repository.js';
import { resProductDTO, resAllProductsDTO } from '../dto/product.dto.js';

const productManager = new ProductMaganer();

const getAllProducts = async filters => {
  try {
    const { limit, sort, page, category } = filters;
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
    return resAllProductsDTO(products);
  } catch (error) {}
};

const getProductById = async idProduct => {
  const product = await productManager.getProductById(idProduct);
  return resProductDTO(product);
};

const createProduct = async product => {
  return await productManager.createProduct(product);
};

const updateProduct = async (idProduct, product) => {
  return await productManager.updateProduct(idProduct, product);
};

const deleteProduct = async idProduct => {
  return await productManager.deleteProduct(idProduct);
};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
