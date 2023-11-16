const { verifyPass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class ControllerUser {
  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      await User.create({ name, email, password });
      res.status(201).json('Register Success');
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      if (!email) {
        throw { name: 'validationError', message: 'Email or Password is required' };
      }

      if (!password) {
        throw { name: 'validationError', message: 'Email or Password is required' };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: 'invalidUser', message: 'Email or Password is Invalid' };
      }

      const isPassword = verifyPass(password, user.password);
      if (!isPassword) {
        throw { name: 'invalidUser', message: 'Email or Password is Invalid' };
      }

      const access_token = signToken({ id: user.id, role: user.role });

      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
