import { productModel } from './models/product.model.js';

export default class ProductMaganer {
  getProducts = async (query, filter) => {
    try {
      const products = await productModel.paginate(query, filter);
      return products;
    } catch (error) {
      console.error(`error:${error}`);
      throw new Error('Products not found');
    }
  };

  getProductById = async idProduct => {
    try {
      const product = await productModel.findById(idProduct);
      return product;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  createProduct = async product => {
    try {
      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  updateProduct = async (idProduct, product) => {
    try {
      const updateProduct = await productModel.findByIdAndUpdate(idProduct, product, {
        new: true,
      });
      return updateProduct;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  deleteProduct = async idProduct => {
    try {
      const deletedProduct = await productModel.findByIdAndUpdate(idProduct, { status: false }, { new: true });
      return deletedProduct;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };
}
