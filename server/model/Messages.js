import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: 'UserModel',
    },
    message: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model('Chat', chatSchema);
