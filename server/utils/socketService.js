import { Server } from 'socket.io';
import { Types } from 'mongoose';
import { ChatModel } from '../model/Messages.js';

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
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

    socket.on('sendMessage', async (senderId, receiverId, message, roomId) => {
      console.log(
        `Message ${message} sent by sender ${senderId} to recevier ${receiverId} to room ${roomId}`
      );
      socket.to(roomId).emit('receiveMessage', message);
      await ChatModel.create({
        senderId: new Types.ObjectId(senderId),
        receiverId: new Types.ObjectId(receiverId),
        roomId: roomId,
        message: message,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from socket server');
    });
  });
  return io;
};
