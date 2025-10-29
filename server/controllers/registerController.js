import { UserModel } from '../model/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, roles } = req.body;
  const duplicate = await UserModel.findOne({ email });
  if (duplicate) {
    const error = new Error('A user with the same email already exists');
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    roles,
  });
  return res.json({ msg: 'New user regsitered successfully', data: newUser });
};
