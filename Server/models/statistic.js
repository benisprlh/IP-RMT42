'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Statistic.belongsTo(models.Team);
    }
  }
  Statistic.init(
    {
      games: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fastBreakPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      pointsInPaint: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      pointsOffTurnovers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      offReb: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      defReb: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      steals: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      TeamId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Statistic',
    }
  );
  return Statistic;
};
