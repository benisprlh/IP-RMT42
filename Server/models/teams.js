'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teams.belongsTo(models.User);
    }
  }
  Teams.init(
    {
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      city: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Teams',
    }
  );
  return Teams;
};
