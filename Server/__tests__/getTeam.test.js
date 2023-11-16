const app = require('../app');
const request = require('supertest');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

let userAdmin = { name: 'ini', email: 'tes1@mail.com', password: '12345678', role: 'Admin' };
let access_token;

beforeAll(async () => {
  const newUserAdmin = await User.create(userAdmin);
  access_token = signToken({ id: newUserAdmin.id });
});

describe('/teams', () => {
  test('Success fetch data', async () => {
    const { body, status } = await request(app).get('/teams/all').set('Authorization', `Bearer ${access_token}`);
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });

  test('Success failed token not send', async () => {
    const { body, status } = await request(app).get('/teams/all');
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
});
