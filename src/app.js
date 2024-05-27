import express from "express";
import carts from "./routes/carts.router.js";
import products from "./routes/products.router.js";
import router from "./routes/views.router.js";
import { __dirname } from "./path.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductMaganer from "./managers/product.manager.js";

const socFunction = async () => {
    try {
      const listProducts = await productManager.getProducts();
      if (!listProducts) return [];
      return listProducts;
    } catch {};
  };

const productManager = new ProductMaganer(`${__dirname}/db/products.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", carts);
app.use("/api/products", products);
app.use("/api/websocket", router);

app.use(errorHandler);

app.engine(`handlebars`, handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`public`));

const httpServer = app.listen(8080, () => {
  console.log(`Está escuchando el puerto 8080 correctamente`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    try{
        const products = await socFunction();
        console.log(products);
        socketServer.emit("resProduct", {products})
    } catch {};
});
