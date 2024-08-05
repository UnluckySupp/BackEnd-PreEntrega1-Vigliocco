import { userModel } from './models/user.model.js';

export default class UserManager {
  createUser = async data => {
    try {
      const newUser = await userModel.create(data);
      return newUser;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  findUser = async queries => {
    try {
      const findedUser = await userModel.findOne(queries);
      return findedUser;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  updateUser = async (id, data) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
      return updatedUser;
    } catch (error) {
      console.error(`error:${error}`);
    }
  };

  deleteUser = async id => {
    try {
      await userModel.findByIdAndDelete(id);
      return { message: 'User has been deleted.' };
    } catch (error) {
      console.error(`error:${error}`);
    }
  };
}
