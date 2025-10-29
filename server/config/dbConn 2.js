import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo database connected');
  } catch {
    console.log(err);
    process.exit(1);
  }
};
