describe('Inventory Management Tests', () => {
  it('should decrease quantity when sweet is purchased', async () => {
    await request(app).post('/sweets').send({
      id: 3001,
      name: 'Imarti',
      category: 'Milk-Based',
      price: 10,
      quantity: 5
    });

    const res = await request(app).post('/sweets/purchase').send({ id: 3001, quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(3); // original 5 - purchased 2
  });

  it('should fail purchase if stock is insufficient', async () => {
    const res = await request(app).post('/sweets/purchase').send({ id: 3001, quantity: 10 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should restock sweet by quantity', async () => {
    const res = await request(app).post('/sweets/restock').send({ id: 3001, quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(8); // previous 3 + restock 5
  });
});
