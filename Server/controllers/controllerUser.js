const { verifyPass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User, Order } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const axios = require('axios');

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

      if (user && user.loginBy === 'Google') {
        const access_token = signToken({ id: user.id, role: user.role });

        return res.status(200).json({ access_token });
      }

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

  static async upgradeAccount(req, res, next) {
    const orderId = req.body.orderId;
    try {
      const order = await Order.findOne({ where: { orderId } });
      if (!order) {
        throw { name: 'not found', message: 'Order Not Found' };
      }
      console.log(order);

      const base64 = Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString('base64');

      const { data } = await axios(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      });

      if (Number(data.status_code) !== 200) {
        throw { name: 'BadRequest', message: 'Transaction Failed' };
      }
      console.log(data, '<<< Hasil dari status');

      if (data.transaction_status !== 'capture') {
        throw { name: 'BadRequest', message: 'Transaction Failed' };
      }
      console.log(req.user, '<<<< REQ USER');
      await order.update({ status: 'Paid', paidDate: new Date() });
      const user = await User.findOne({ where: { id: req.user.id } });
      console.log(user);
      await user.update({ role: 'Premium' });
      res.json({ message: 'Upgrade to premium success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
