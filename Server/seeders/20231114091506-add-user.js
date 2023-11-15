'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = hashPassword('Admin');
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: password,
        loginBy: 'Manual',
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users');
  },
};
