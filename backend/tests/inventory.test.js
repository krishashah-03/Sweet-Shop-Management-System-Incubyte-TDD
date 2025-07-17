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
  await Sweet.create({
    id: 1001,
    name: 'Patisa',
    category: 'Nut-Based',
    price: 30,
    quantity: 10
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Inventory Management', () => {
  it('should decrease quantity on purchase', async () => {
    const res = await request(app).post('/sweets/purchase').send({
      id: 1001,
      quantity: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(8);
  });

  it('should fail if purchase quantity exceeds stock', async () => {
    const res = await request(app).post('/sweets/purchase').send({
      id: 1001,
      quantity: 20
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should increase quantity on restock', async () => {
    const res = await request(app).post('/sweets/restock').send({
      id: 1001,
      quantity: 5
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  it('should fail restock with negative quantity', async () => {
    const res = await request(app).post('/sweets/restock').send({
      id: 1001,
      quantity: -5
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
