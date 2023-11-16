'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      games: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      fastBreakPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      pointsInPaint: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      pointsOffTurnovers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      offReb: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      defReb: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      steals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      TeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statistics');
  },
};
