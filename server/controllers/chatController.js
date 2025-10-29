import mongoose from 'mongoose';
import { ChatModel } from '../model/Messages.js';

export const receiveUserChatMessages = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user;
  if (!myId) {
    const error = new Error('User unauthenticated to view inbox');
    error.status = 401;
    throw error;
  }
  const messages = await ChatModel.find({
    receiverId: {
      $in: [new Types.ObjectId(userId), new Types.ObjectId(myId)],
    },
    senderId: {
      $in: [new Types.ObjectId(userId), new Types.Object(myId)],
    },
  });
  return res
    .status(200)
    .json({ msg: 'Chat history retrieved successfully', data: messages });
};

export const getChatMembers = async (req, res) => {
  const myId = req.user;
  if (!myId) {
    const error = new Error('User unauthenticated');
    error.status = 401;
    throw error;
  }
  const userInvolvedMessages = await ChatModel.find({
    $or: [{ senderId: myId }, { receiverId: myId }],
  });
  // unique users that the user has ever chatted with
  const usersWithChatHistory = userInvolvedMessages.reduce(
    (uniqueUserIds, message) => {
      //other user = all the users that the logged in user has ever chatted with
      const otherUserId =
        message.senderId.toString() === myId
          ? message.receiverId
          : message.senderId;
      //unique user ids = only the unique ids of other users from all the chats
      if (!uniqueUserIds.includes(otherUserId)) {
        uniqueUserIds.push(otherUserId);
      }
      return uniqueUserIds;
    },
    []
  );
  const uniqueOtherUsers = await UserModel.find({
    _id: { $in: usersWithChatHistory },
  });
  return res
    .status(200)
    .json({ data: uniqueOtherUsers, msg: 'Users with chat history retrieved' });
};
