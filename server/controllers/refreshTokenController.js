import { UserModel } from '../model/User';

export const refreshTokenController = async (req, res) => {
  const cookie = req.cookie;
  if (!cookie?.jwt) return res.status(401);
  const refreshToken = req.cookie.jwt;
  const foundUser = await UserModel.findOne({ refreshToken });
  if (!foundUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err || decoded.user != foundUser._id) {
      const error = new Error('Forbidden request');
      error.status = 403;
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
      { expiresIn: '15m' }
    );
    return res.json({ accessToken });
  });
};
