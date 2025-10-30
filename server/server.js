import { Types } from 'mongoose';
import app from './app.js';
import { connectDB } from './config/dbConn.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', async (room, otherUserId, myUserId) => {
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
          type: 'Room-joined message',
        });
      }
    } catch (err) {
      console.log('Errr joining room', err);
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
    server = app.listen(PORT, () => {
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
