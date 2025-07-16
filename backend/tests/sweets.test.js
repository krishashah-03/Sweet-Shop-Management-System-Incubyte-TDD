const request = require('supertest');
const app = require('../app');

describe('POST /sweets', () => {
  it('should create a sweet with valid data', async () => {
    const res = await request(app)
      .post('/sweets')
      .send({
        id: 1001,
        name: 'Kaju Katli',
        category: 'Nut-Based',
        price: 50,
        quantity: 20
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Kaju Katli');
    expect(res.body).toHaveProperty('category', 'Nut-Based');
  });
});
