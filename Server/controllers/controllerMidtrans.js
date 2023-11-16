const midtransClient = require('midtrans-client');
const { nanoid } = require('nanoid');
const { Order } = require('../models');

class ControllerMidtrans {
  static async getToken(req, res, next) {
    try {
      const price = 50_000;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const orderId = `tr-ua-${nanoid()}`;
      console.log(req.user.id);
      await Order.create({
        orderId,
        UserId: req.user.id,
        amount: price,
      });

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user.name,
          email: req.user.email,
        },
      };

      const { token } = await snap.createTransaction(parameter);

      res.json({ transaction_token: token, orderId });
    } catch (error) {
      console.log(error);
      //   next(error);
    }
  }
}

module.exports = ControllerMidtrans;
