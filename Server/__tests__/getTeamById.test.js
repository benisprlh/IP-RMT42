const app = require('../app');
const request = require('supertest');
const { User, sequelize, Team } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

let userAdmin = { name: 'ini', email: 'tes1@mail.com', password: '12345678', role: 'Admin' };
let access_token;
let team;
let id;
beforeAll(async () => {
  const newUserAdmin = await User.create(userAdmin);
  access_token = signToken({ id: newUserAdmin.id });

  team = await Team.create({ name: 'in', city: 'bdg' });
  id = team.id;
});

describe('/teams', () => {
  test('failed token not send', async () => {
    const { body, status } = await request(app).get(`/teams/${id}`);
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Unauthenticated');
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Team.destroy({ where: { name: 'in' } });
});
