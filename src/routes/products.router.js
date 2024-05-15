import { Router } from "express";
const products = Router();

import { __dirname } from "../path.js";

import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

import { productCheck } from "../middlewares/productCheck.js";

products.get('/', async(req,res)=>{
    try{
        const { limit } = req.query;
        const products = await productManager.getProducts(Number(limit));
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

products.get('/:idProduct', async(req,res)=>{
    try {
        const { idProduct } = req.params;
        const product = await productManager.getProductByID(idProduct);
        if (!product) res.status(404).json({message: "Product not found"});
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

products.post('/', productCheck, async (req,res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch(error) {
        res.status(404).json({message:error.message})
    }
})

products.put("/:idProduct", async (req,res) => {
    try {
        const {idProduct} = req.params;
        const product = req.body;
        const productUpdate = await productManager.updateProduct(product, idProduct);
        if (!productUpdate) res.status(404).json({message:"Error updating product."});
    } catch {
        res.status(500).json({message:error.message});
    }
})

products.delete("/:idProduct", async (req,res) => {
    try {
        const {idProduct} = req.params;
        const productDelete = await productManager.deleteProduct(idProduct);
        if(!productDelete) res.status(404).json({message:"Error deleting product."});
        res.status(200).send(`El producto ${idProduct} ha sido eliminado correctamente.`);
    } catch(error) {
        res.status(500).json({message:error.message});
    }
})

export default products;