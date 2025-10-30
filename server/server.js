import app from './app.js';
import { connectDB } from './config/dbConn.js';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { initializeSocket } from './utils/socketService.js';

const httpServer = createServer(app);

//keeps the reference to the socket instance
let io;
let server;

export const startServer = async (PORT) => {
  try {
    await connectDB();
    io = initializeSocket(server);
    server = httpServer.listen(PORT, () => {
      console.log(`App is listening on PORT ,${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};

export const handleShutDown = async () => {
  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    if (server) server.close(() => console.log('Server closing down...'));
    await mongoose.connection.close();
    console.log('Mongo connection closed');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down...');
    if (server) server.close(() => console.log('Server closing down'));
    await mongoose.connection.close();
    console.log('Mongo connection closed');
    process.exit(0);
  });
};
