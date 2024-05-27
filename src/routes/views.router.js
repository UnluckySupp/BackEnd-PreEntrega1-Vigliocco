import { Router } from "express";
import ProductMaganer from "../managers/product.manager.js";
import { __dirname } from "../path.js";

const router = Router();

const allProducts = new ProductMaganer(`${__dirname}/db/products.json`);

router.get("/", async (req,res) => {
    try {
       const { limit } = req.query;
       const products = await allProducts.getProducts(limit);
       console.log(products);
       if (!products) res.status(404).json({message: "Products not found"})
        res.render("home", {products})
    } catch(error) {
        res.status(404).json({message:error.message})
    }
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})

export default router;
