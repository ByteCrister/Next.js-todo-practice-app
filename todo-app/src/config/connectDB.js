import mongoose from 'mongoose';

let isConnected = false; // To track the connection state

const connectDB = async () => {
  if (isConnected) {
    console.log('Database already connected');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI + '/test');
    isConnected = db.connections[0].readyState === 1;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
