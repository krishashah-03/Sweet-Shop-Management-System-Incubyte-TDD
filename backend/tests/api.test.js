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

describe('Health & Invalid Route Tests', () => {
  it('should return 200 for /health check', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/no-such-route');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
