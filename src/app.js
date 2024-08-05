import express from 'express';
import session from 'express-session';
import carts from './routes/carts.router.js';
import products from './routes/products.router.js';
import users from './routes/user.router.js';
import sessions from './routes/sessions.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectionMongoDB } from './config/mongoDB.config.js';
import envsConfig from './config/envs.config.js';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();

connectionMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: envsConfig.SECRET_CODE, resave: true, saveUninitialized: true }));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use('/api/carts', carts);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/sessions', sessions);

app.use(errorHandler);

app.listen(envsConfig.PORT, () => {
  console.log(`Port ${envsConfig.PORT} connected correctly`);
});
