export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.roles;
    if (!req.roles) return res.sendStatus(400);
    const match = allowedRoles.includes(userRole);
    if (!match) {
      return res.status(401).json({ msg: 'User unauthorized' });
    }
    next();
  };
};
