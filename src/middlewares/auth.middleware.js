export const authMiddleware = role => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'You need login' });
    }
    if (req.user.role != role) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' });
    }
    next();
  };
};
