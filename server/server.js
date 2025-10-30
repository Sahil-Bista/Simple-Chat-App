import { Types } from 'mongoose';
import app from './app.js';
import { connectDB } from './config/dbConn.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ChatModel } from './model/Messages.js';
import mongoose from 'mongoose';

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', async (room, otherUserId, myUserId, callback) => {
    if (
      !otherUserId ||
      otherUserId === 'undefined' ||
      otherUserId === 'null' ||
      otherUserId.trim() === ''
    ) {
      console.log('Missing userId. Cannot join room.', { otherUserId });
      return;
    }

    socket.join(room);
    try {
      const existingRoom = await ChatModel.findOne({
        senderId: new Types.ObjectId(otherUserId),
        receiverId: new Types.ObjectId(myUserId),
        roomId: room,
        type: 'room-joined',
      });

      if (!existingRoom) {
        await ChatModel.create({
          senderId: new Types.ObjectId(otherUserId),
          receiverId: new Types.ObjectId(myUserId),
          roomId: room,
          message: `You have matched with user: ${otherUserId}`,
          type: 'room-joined',
        });
      }
      callback(true);
    } catch (err) {
      console.log('Errr joining room', err);
      callback(false);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from socket server');
  });
});

let server;

export const startServer = async (PORT) => {
  try {
    await connectDB();
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
