async function authorization(req, res, next) {
  try {
    if (req.user.role === 'Admin') {
      return next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
