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

    it('should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/sweets')
            .send({
                // intentional omit
                id: 1002,
                price: 30,
                quantity: 15
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should reject sweet with negative price or quantity', async () => {
        const res = await request(app)
            .post('/sweets')
            .send({
                id: 1003,
                name: 'Gulab Jamun',
                category: 'Milk-Based',
                price: -10, //Testing Invalid Data
                quantity: -5 
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should reject duplicate sweet IDs', async () => {
        const sweetData = {
            id: 1004,
            name: 'Rasgulla',
            category: 'Milk-Based',
            price: 25,
            quantity: 30
        };

        // First insertion-Successful
        await request(app).post('/sweets').send(sweetData);

        // Second insertion with same ID — should fail
        const res = await request(app).post('/sweets').send(sweetData);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
