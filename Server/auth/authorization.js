async function authorization(req, res, next) {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'Premium') {
      return next();
    } else {
      throw { name: 'forbidden' };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
