import { UserModel } from '../model/User.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    const error = new Error(
      'No user with this email in the system, please try signing up first'
    );
    error.statusCode = 400;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    const error = new Error('Incorrect password');
    error.statusCode = 401;
    throw error;
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        user: foundUser._id,
        role: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    {
      user: foundUser._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15d' }
  );
  foundUser.refresh_token = refreshToken;
  foundUser.save();
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({ accessToken });
};
