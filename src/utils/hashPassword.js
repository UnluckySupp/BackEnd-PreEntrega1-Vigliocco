import bcrypt from 'bcrypt';

export const hashPass = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const checkPass = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};
