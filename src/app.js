import express from 'express';
import carts from './routes/carts.router.js';
import products from './routes/products.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectionMongoDB } from './config/mongoDB.config.js';

const app = express();

connectionMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', carts);
app.use('/api/products', products);

app.use(errorHandler);

app.listen(8080, () => {
  console.log(`Está escuchando el puerto 8080 correctamente`);
});
