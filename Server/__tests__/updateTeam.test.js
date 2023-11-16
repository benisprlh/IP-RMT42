const app = require('../app');
const request = require('supertest');
const { User, sequelize, Team } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

let userAdmin = { name: 'ini', email: 'tes1@mail.com', password: '12345678', role: 'Admin' };
let user = { name: 'aa', email: 'aaa@gmail.com', password: 'sdasada' };
let newTeam = { name: 'is', city: 'yayaya', nickname: 'blablalba', logo: 'sdadas' };
let access_token;
let team;
let id;
let newUser;
let new_token;
beforeAll(async () => {
  const newUserAdmin = await User.create(userAdmin);
  access_token = signToken({ id: newUserAdmin.id });

  newUser = await User.create(user);
  new_token = signToken({ id: newUser.id });

  team = await Team.create({ name: 'isdsad', city: 'yay', nickname: 'bla', logo: 'sd' });
  id = team.id;
});

describe('/teams', () => {
  test('Success update teams', async () => {
    const { body, status } = await request(app).put(`/teams/update/${id}`).send(newTeam).set('Authorization', `Bearer ${access_token}`);
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });

  test('Failed Unauthorized', async () => {
    const { body, status } = await request(app).put(`/teams/update/${id}`).set('Authorization', `Bearer ${new_token}`);
    expect(status).toBe(403);
    expect(body).toBeInstanceOf(Object);
  });

  test('Failed Unauthenticated', async () => {
    const { body, status } = await request(app).put(`/teams/update/${id}`);
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
  });

  test('Failed Unauthenticated', async () => {
    const { body, status } = await request(app).put(`/teams/update/${id}`).set('Authorization', `Bearer fsdfsdsdfsdfsdsddsfsdcds`);
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
  });

  test('Failed data not found', async () => {
    const { body, status } = await request(app).put(`/teams/update/9999`).send(newTeam).set('Authorization', `Bearer ${access_token}`);
    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
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
