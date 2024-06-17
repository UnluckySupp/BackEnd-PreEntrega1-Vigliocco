import { productModel } from './models/product.model.js';

export default class ProductMaganer {
  getProducts = async (query, filter) => {
    try {
      const products = await productModel.paginate(query, filter);
      console.log(products);
      return products;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  getProductById = async idProduct => {
    try {
      const product = await productModel.findById(idProduct);
      console.log(product);
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
      const updateProduct = await productModel.findByIdAndUpdate(
        idProduct,
        product,
        {
          new: true,
        }
      );
      return updateProduct;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  deleteProduct = async idProduct => {
    try {
      const deletedProduct = await productModel.findByIdAndUpdate(
        idProduct,
        { status: false },
        { new: true }
      );
      return deletedProduct;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };
}
