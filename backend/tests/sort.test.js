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
    { id: 2001, name: 'Kaju Katli', category: 'Nut-Based', price: 45, quantity: 10 },
    { id: 2002, name: 'Rasgulla', category: 'Milk-Based', price: 25, quantity: 20 },
    { id: 2003, name: 'Barfi', category: 'Milk-Based', price: 35, quantity: 5 }
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Sorting Logic', () => {
  it('sorts by price ascending', async () => {
    const res = await request(app).get('/sweets/sort?by=price&order=asc');
    expect(res.body.map(s => s.price)).toEqual([25, 35, 45]);
  });

  it('sorts by price descending', async () => {
    const res = await request(app).get('/sweets/sort?by=price&order=desc');
    expect(res.body.map(s => s.price)).toEqual([45, 35, 25]);
  });

  it('sorts by quantity ascending', async () => {
    const res = await request(app).get('/sweets/sort?by=quantity&order=asc');
    expect(res.body.map(s => s.quantity)).toEqual([5, 10, 20]);
  });

  it('sorts by quantity descending', async () => {
    const res = await request(app).get('/sweets/sort?by=quantity&order=desc');
    expect(res.body.map(s => s.quantity)).toEqual([20, 10, 5]);
  });

  it('fails on invalid sort field', async () => {
    const res = await request(app).get('/sweets/sort?by=flavor&order=asc');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
