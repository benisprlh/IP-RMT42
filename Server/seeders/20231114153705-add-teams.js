'use strict';
const axios = require('axios');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams',
      headers: {
        'X-RapidAPI-Key': process.env.SECRET_API_KEY_NBA,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };

    let response;

    try {
      response = await axios.request(options);
    } catch (error) {
      console.error(error);
    }
    const dataTeams = response.data.response;

    const data = [];
    for (const team of dataTeams) {
      if (team.id <= 20) {
        const dataTeam = {
          name: team.name,
          nickname: team.nickname,
          city: team.city,
          logo: team.logo,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        data.push(dataTeam);
      }
    }
    await queryInterface.bulkInsert('Teams', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
