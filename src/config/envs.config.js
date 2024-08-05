import dotenv from 'dotenv';

dotenv.config();

const envsConfig = {
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  PORT: process.env.PORT,
  JWT_SECRETCODE: process.env.JWT_SECRETCODE,
};

export default envsConfig;
