'use strict';
const axios = require('axios');
const sleep = require('../helpers/seedWithTime');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let result = [];
    let total = 20;
    let count = 1;

    for (let i = 0; i < total; i++) {
      if (count % 10 === 0) {
        await sleep(120000);
      }

      const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
        params: {
          id: count,
          season: '2020',
        },
        headers: {
          'X-RapidAPI-Key': process.env.SECRET_API_KEY_NBA,
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        },
      };
      let response = { parameters: '', response: '' };
      try {
        const { data } = await axios.request(options);
        response.parameters = data.parameters;
        response.response = data.response;
      } catch (error) {
        console.error(error);
      }

      let statisticTeam = {
        games: response.response[0].games,
        fastBreakPoints: response.response[0].fastBreakPoints,
        pointsInPaint: response.response[0].pointsInPaint,
        pointsOffTurnovers: response.response[0].pointsOffTurnovers,
        points: response.response[0].points,
        offReb: response.response[0].offReb,
        defReb: response.response[0].defReb,
        steals: response.response[0].steals,
        TeamId: response.parameters.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      result.push(statisticTeam);
      count++;
    }

    await queryInterface.bulkInsert('Statistics', result);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statistics', null, {});
  },
};
