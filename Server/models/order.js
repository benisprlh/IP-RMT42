'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: 'orderId is required',
          },
          notEmpty: {
            message: 'orderId is required',
          },
        },
      },
      UserId: DataTypes.INTEGER,
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: 'Amount is required',
          },
          notEmpty: {
            message: 'Amount is required',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
      paidDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
