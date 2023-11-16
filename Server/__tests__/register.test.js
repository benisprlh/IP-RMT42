const app = require('../app');
const request = require('supertest');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

let userAdmin = { name: 'ini', email: 'tes1@mail.com', password: '12345678', role: 'admin' };
let user1 = { name: 'ini', email: 'tes2@mail.com', password: '12345678' };

beforeAll(async () => {
  await User.create(user1);
});

describe('/users', () => {
  test('Success Register (201)', async () => {
    const { body, status } = await request(app).post('/users/register').send(userAdmin);
    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
  });

  test('Failed Register email not send (400)', async () => {
    const { body, status } = await request(app).post('/users/register').send({ name: 'ini', password: '12345678' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email is required');
  });

  test('Failed Register password not send (400)', async () => {
    const { body, status } = await request(app).post('/users/register').send({ name: 'ini', email: 'tes@mail.com' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Password is required');
  });

  test('Failed Register email empty string (400)', async () => {
    const { body, status } = await request(app).post('/users/register').send({ name: 'ini', email: '', password: '12345678' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Email is required');
  });

  test('Failed Register password empty string (400)', async () => {
    const { body, status } = await request(app).post('/users/register').send({ name: 'ini', email: 'tes2@mail.com', password: '' });
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('Password is required');
  });

  test('Failed Register email has already (400)', async () => {
    const { body, status } = await request(app).post('/users/register').send(user1);
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toContain('email must be unique');
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
