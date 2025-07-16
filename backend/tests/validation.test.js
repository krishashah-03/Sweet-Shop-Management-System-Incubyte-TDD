const request = require('supertest');
const app = require('../app');

describe('Validation Tests', () => {
  it('should fail if name is missing', async () => {
    const res = await request(app).post('/sweets').send({
      id: 2001,
      category: 'Milk-Based',
      price: 20,
      quantity: 15
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail for invalid category', async () => {
    const res = await request(app).post('/sweets').send({
      id: 2002,
      name: 'Mysore Pak',
      category: 'Fried',
      price: 30,
      quantity: 10
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail for non-numeric price', async () => {
    const res = await request(app).post('/sweets').send({
      id: 2003,
      name: 'Halwa',
      category: 'Milk-Based',
      price: "twenty",
      quantity: 10
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
