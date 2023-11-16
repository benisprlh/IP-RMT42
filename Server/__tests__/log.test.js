const app = require('../app');
const request = require('supertest');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

let user1 = { name: 'asa', email: 'tes@mail.com', password: '12345678' };

beforeAll(async () => {
  await User.create(user1);
});

describe('/users', () => {
  test('Success Login', async () => {
    const { body, status } = await request(app).post('/users/login').send(user1);
    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('access_token', expect.any(String));
  });

  test('Failed login email not send(400)', async () => {
    const { body, status } = await request(app).post('/users/login').send({ password: '12345678' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email or Password is required');
  });

  test('Failed login password not send(400)', async () => {
    const { body, status } = await request(app).post('/users/login').send({ email: 'tes@mail.com' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email or Password is required');
  });

  test('Failed login email not matching(401)', async () => {
    const { body, status } = await request(app).post('/users/login').send({ email: 'tes2@mail.comm', password: '12345678' });
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email or Password is Invalid');
  });

  test('Failed login password not matching(401)', async () => {
    const { body, status } = await request(app).post('/users/login').send({ email: 'tes2@mail.com', password: '12345678910' });
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email or Password is Invalid');
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
