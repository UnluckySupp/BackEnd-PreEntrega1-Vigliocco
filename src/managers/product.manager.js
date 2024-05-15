import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductMaganer {
    constructor(path) {
        this.path = path;
    }

    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                const parsedProducts = JSON.parse(products);
                if(limit) return parsedProducts.slice(0, limit);
                return parsedProducts;
            } else {
                return console.log("Not found.");
            }
        } catch(error){
            console.error(error);
        }
    }

    async getProductByID(id) {
        try {
            const product = await this.getProducts();
            const obtainedProduct = product.find(p => p.id === id);
            if (!obtainedProduct) return null;
            return obtainedProduct;
        } catch (error) {
            console.error(error);
        }
    }

    async createProduct(product) {
        try {
            const newProduct = {
                id: uuidv4(),
                status: true,
                ...product,
            };
            const products = await this.getProducts();
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newProduct;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(product, id) {
        try {
            const products = await this.getProducts();
            let productExist = await this.getProductByID(id);
            console.log(productExist);
            if (!productExist) return null;
            const updatedProduct = {...productExist, ...product}
            console.log(updatedProduct);
            const newProduct = products.filter(p => p.id !== id);
            newProduct.push(updatedProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(newProduct));
            return updatedProduct;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            if(products.length > 0) {
                let productExist = await this.getProductByID(id);
                if (productExist) {
                    const index = products.findIndex(p => p.id === id);
                    if (index !== -1) {
                        products.splice(index, 1);
                        await fs.promises.writeFile(this.path, JSON.stringify(products));
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch(error) {
            console.error(error);
        }
    }

    // async deleteFile() {
    //     try {
    //         await fs.promises.unlink(this.path);
    //         console.log("Archivo eliminado correctamente.")
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }
}

