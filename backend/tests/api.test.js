const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

describe('API Health & Error Tests', () => {
  it('should return 200 for /health check route', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
  });

  it('should return 404 for invalid route', async () => {
    const res = await request(app).get('/nope');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
