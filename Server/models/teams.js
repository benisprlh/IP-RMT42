'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsTo(models.User);
      Team.hasOne(models.Statistic);
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required',
          },
          notEmpty: {
            msg: 'Name is required',
          },
        },
      },
      nickname: DataTypes.STRING,
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'City is required',
          },
          notEmpty: {
            msg: 'City is required',
          },
        },
      },
      logo: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Team',
    }
  );

  return Team;
};
