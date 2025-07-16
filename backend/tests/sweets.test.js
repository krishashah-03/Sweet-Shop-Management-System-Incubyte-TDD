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

    it('should return a list of all sweets', async () => {
        // Create two sample sweets first
        await request(app).post('/sweets').send({
            id: 1005,
            name: 'Soan Papdi',
            category: 'Pastry',
            price: 20,
            quantity: 10
        });

        await request(app).post('/sweets').send({
            id: 1006,
            name: 'Peda',
            category: 'Milk-Based',
            price: 15,
            quantity: 25
        });

        const res = await request(app).get('/sweets');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should delete a sweet by ID', async () => {
        const sweet = {
            id: 1007,
            name: 'Besan Ladoo',
            category: 'Nut-Based',
            price: 20,
            quantity: 15
        };

        await request(app).post('/sweets').send(sweet);

        // Delete the sweet
        const res = await request(app).delete(`/sweets/${sweet.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });

    it('should return an error when trying to delete a non-existent sweet ID', async () => {
        const res = await request(app).delete('/sweets/9999'); // ID does not exist

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toMatch(/not found/i); // Optional message check
    });

});
