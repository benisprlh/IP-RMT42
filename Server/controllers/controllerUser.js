const { verifyPass } = require('../helpers/bcrypt');
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
    console.log(email, password);
    try {
      if (!email) {
        throw { message: 'Email or Password is required' };
      }

      if (!password) {
        throw { message: 'Email or Password is required' };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { message: 'Email or Password is Invalid' };
      }

      const isPassword = verifyPass(password, user.password);
      if (!isPassword) {
        throw { message: 'Email or Password is Invalid' };
      }

      res.status(201).json('Login Success');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
