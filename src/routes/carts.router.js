import { Router } from "express";

const carts = Router();

import CartManager from "../managers/cart.manager.js";
import { __dirname } from "../path.js";
const cartManager = new CartManager(`${__dirname}/db/carts.json`);

carts.post("/", async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch(error) {
        res.status(500).json(error.message);
    }
})

carts.get("/:idCart", async (req, res) => {
    try {
        const {idCart} = req.params;
        res.json(await cartManager.getCartById(idCart));
    } catch (error) {
        console.error(error);
    }
})

carts.post("/:idCart/product/:idProduct", async (req, res, next) => {
    try {
        const { idProduct } = req.params;
        const { idCart } = req.params;
        const response = await cartManager.saveProductInCart(idCart, idProduct);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

export default carts;