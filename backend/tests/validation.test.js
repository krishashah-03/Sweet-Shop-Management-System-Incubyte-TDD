const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Sweet = require('../models/Sweet');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});


describe('Sweet Creation Validations', () => {
  it('fails if name is missing', async () => {
    const res = await request(app).post('/sweets').send({
      id: 9001,
      category: 'Milk-Based',
      price: 15,
      quantity: 10
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('fails for invalid category', async () => {
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

  it('fails for non-numeric price', async () => {
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

  it('fails if sweet already exists (duplicate ID)', async () => {
    await request(app).post('/sweets').send({
      id: 9004,
      name: 'Ladoo',
      category: 'Nut-Based',
      price: 20,
      quantity: 5
    });

    const res = await request(app).post('/sweets').send({
      id: 9004,
      name: 'Ladoo',
      category: 'Nut-Based',
      price: 20,
      quantity: 5
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('fails for duplicate name (case-insensitive)', async () => {
    await request(app).post('/sweets').send({
      id: 9005,
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 25,
      quantity: 10
    });

    const res = await request(app).post('/sweets').send({
      id: 9006,
      name: 'gulab jamun',
      category: 'Milk-Based',
      price: 25,
      quantity: 10
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('fails for negative price or quantity', async () => {
    const res = await request(app).post('/sweets').send({
      id: 9007,
      name: 'Halwa',
      category: 'Pastry',
      price: -10,
      quantity: -5
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
