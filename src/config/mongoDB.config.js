import mongoose from 'mongoose';

export const connectionMongoDB = async () => {
  try {
    mongoose.connect('');
    console.log('CONECTADO CORRECTAMENTE CON MONGODB ATLAS');
  } catch (error) {
    console.error(`error:${error}}`);
  }
};
