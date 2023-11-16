const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: 'Unauthenticated' };
    const dataToken = verifyToken(access_token.replace('Bearer ', ''));
    if (!dataToken) throw { name: 'Unauthenticated' };
    const user = await User.findByPk(dataToken.id);
    if (!user) throw { name: 'Unauthenticated' };
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role, loginBy: user.loginBy };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
