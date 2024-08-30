import { userDTO } from '../dto/users.dto.js';
import userServices from '../services/user.services.js';

const registerUser = async (req, res) => {
  const resUserDTO = userDTO(req.user);
  res.status(201).json({ status: 'success', payload: resUserDTO });
};

const logUser = async (req, res) => {
  const token = userServices.logUser(req.user);
  res.cookie('token', token);
  const resUserDTO = userDTO(req.user);
  res.status(201).json({ status: 'success', payload: resUserDTO });
};

export default { registerUser, logUser };
