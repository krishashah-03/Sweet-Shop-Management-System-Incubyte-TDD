const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Validation Tests', () => {
  it('should fail if name is missing', async () => {
    const res = await request(app).post('/sweets').send({
      id: 9001,
      category: 'Milk-Based',
      price: 15,
      quantity: 10
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail for invalid category', async () => {
    const res = await request(app).post('/sweets').send({
      id: 9002,
      name: 'Mystery Sweet',
      category: 'Weird',
      price: 30,
      quantity: 10
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail for non-numeric price', async () => {
    const res = await request(app).post('/sweets').send({
      id: 9003,
      name: 'SugarCube',
      category: 'Candy',
      price: 'ten',
      quantity: 5
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
