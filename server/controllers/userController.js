import { UserModel } from '../model/User.js';

export const getUsers = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    const error = new Error('User unauthenticated to get access');
    error.status = 401;
    throw error;
  }
  const users = await UserModel.find({});
  const otherUsers = users.filter((user) => user._id.toString() !== userId);
  if (!otherUsers) {
    return res
      .status(201)
      .json({ msg: 'You are the only user registered in the system yet' });
  }
  return res.json({ msg: 'Users retrieved successfully', data: otherUsers });
};
