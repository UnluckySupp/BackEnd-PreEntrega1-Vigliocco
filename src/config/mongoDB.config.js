import mongoose from 'mongoose';
import envsConfig from './envs.config.js';

export const connectionMongoDB = async () => {
  try {
    mongoose.connect(envsConfig.MONGODB_URL);
    console.log('CONECTADO CORRECTAMENTE CON MONGODB ATLAS');
  } catch (error) {
    console.error(`error:${error}}`);
  }
};
