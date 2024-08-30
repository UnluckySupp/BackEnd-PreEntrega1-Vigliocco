import { Router } from 'express';
import passport from 'passport';
import { userDTO } from '../dto/users.dto.js';

const router = Router();

router.get('/current', passport.authenticate('jwt'), async (req, res) => {
  const resUserDTO = userDTO(req.user);
  res.send(resUserDTO);
});

export default router;
