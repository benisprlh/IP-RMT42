const { verifyPass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class ControllerUser {
  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      await User.create({ name, email, password });
      res.status(201).json({ id: User.id, name: User.name, email: User.email });
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

      if (user.loginBy === 'Google') {
        throw { name: 'validationError', message: 'Please log in with a Google account' };
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

  static async authG(req, res, next) {
    const { g_token } = req.headers;
    try {
      const ticket = await client.verifyIdToken({
        idToken: g_token,
        audience: process.env.G_CLIENT,
      });
      const payload = ticket.getPayload();
      console.log(payload, '<<<< Payload');

      const user = await User.findOne({ where: { email: payload.email } });
      if (user && user.loginBy === 'Manual') {
        throw { name: 'validationError', message: 'Sorry, you have to log in with a password' };
      }
      console.log('1');

      if (user && user.loginBy === 'Google') {
        const access_token = signToken({ id: user.id, role: user.role });

        return res.status(200).json({ access_token });
      }
      console.log('2');

      const newUser = User.create({
        name: payload.name,
        email: payload.email,
        password: String(Math.random()),
        loginBy: 'Google',
      });
      const access_token = signToken({ id: newUser.id, role: newUser.role });

      res.status(201).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
