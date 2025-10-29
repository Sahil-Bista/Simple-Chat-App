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
