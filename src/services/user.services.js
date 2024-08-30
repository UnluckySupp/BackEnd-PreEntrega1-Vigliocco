import { hashPass } from '../utils/hashPassword.js';
import { createToken } from '../utils/jwt.js';
import UserManager from '../persistence/mongoDB/user.repository.js';

const userManager = new UserManager();

const createUser = (first_name, last_name, age, username, password, _id) => {
  const user = { first_name, last_name, age, email: username, password: hashPass(password), cart: _id };
  return user;
};

const addUserToDB = async user => {
  return await userManager.createUser(user);
};

const logUser = user => {
  const token = createToken(user);
  return token;
};

const findUser = async query => {
  const user = await userManager.findUser(query);
  return user;
};

export default { createUser, logUser, findUser, addUserToDB };
