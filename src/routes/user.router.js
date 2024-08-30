import { Router } from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post('/register', passport.authenticate('register'), userController.registerUser);

router.post('/login', passport.authenticate('login'), userController.logUser);

export default router;
