import { Router } from 'express';
import passport from 'passport';
import { createToken } from '../utils/jwt.js';

const router = Router();

router.post('/register', passport.authenticate('register'), async (req, res) => {
  res.status(201).json({ status: 'success', payload: req.user });
});

router.post('/login', passport.authenticate('login'), async (req, res) => {
  const token = createToken(req.user);
  res.cookie('token', token);
  res.status(201).json({ status: 'success', payload: req.user });
});

export default router;
