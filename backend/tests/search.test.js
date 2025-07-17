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
  await Sweet.insertMany([
    { id: 3001, name: 'Patisa', category: 'Nut-Based', price: 40, quantity: 10 },
    { id: 3002, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 15 },
    { id: 3003, name: 'Rasgulla', category: 'Milk-Based', price: 30, quantity: 20 }
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Search & Filter', () => {
  it('should match name case-insensitively', async () => {
    const res = await request(app).get('/sweets/search?name=patisa');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name.toLowerCase()).toContain('patisa');
  });

  it('should filter by category', async () => {
    const res = await request(app).get('/sweets/search?category=Nut-Based');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(s => s.category === 'Nut-Based')).toBe(true);
  });

  it('should match price range', async () => {
    const res = await request(app).get('/sweets/search?minPrice=35&maxPrice=45');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(s => s.price >= 35 && s.price <= 45)).toBe(true);
  });

  it('should return empty array on no match', async () => {
    const res = await request(app).get('/sweets/search?name=Zebra');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
