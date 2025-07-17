const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Sweet = require('../models/Sweet');

beforeEach(async () => {
  await Sweet.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await Sweet.deleteMany({});
    await mongoose.connection.close();
  }
});


describe('POST /sweets', () => {
  it('should create a sweet with valid data', async () => {
    const res = await request(app).post('/sweets').send({
      id: 1010,
      name: 'Mysore Pak',
      category: 'Nut-Based',
      price: 60,
      quantity: 30,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Mysore Pak');
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(app).post('/sweets').send({
      id: 1011,
      price: 25,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should reject duplicate sweet IDs', async () => {
    await request(app).post('/sweets').send({
      id: 1012,
      name: 'Ladoo',
      category: 'Milk-Based',
      price: 20,
      quantity: 15,
    });

    const res = await request(app).post('/sweets').send({
      id: 1012,
      name: 'Ladoo',
      category: 'Milk-Based',
      price: 20,
      quantity: 15,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should reject negative price or quantity', async () => {
    const res = await request(app).post('/sweets').send({
      id: 1013,
      name: 'Halwa',
      category: 'Pastry',
      price: -10,
      quantity: -5,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail for invalid category', async () => {
    const res = await request(app).post('/sweets').send({
      id: 1014,
      name: 'Unknown Sweet',
      category: 'Weird',
      price: 10,
      quantity: 5,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
