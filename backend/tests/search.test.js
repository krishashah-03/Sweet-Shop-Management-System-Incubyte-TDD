describe('Search Functionality Tests', () => {
  it('should search sweets by name (case-insensitive)', async () => {
    await request(app).post('/sweets').send({
      id: 4001,
      name: 'Patisa',
      category: 'Nut-Based',
      price: 30,
      quantity: 20
    });

    const res = await request(app).get('/sweets/search?name=patisa');

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name.toLowerCase()).toBe('patisa');
  });

  it('should filter sweets by category', async () => {
    const res = await request(app).get('/sweets/search?category=Nut-Based');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(s => s.category === 'Nut-Based')).toBe(true);
  });

  it('should filter sweets by price range', async () => {
    const res = await request(app).get('/sweets/search?minPrice=20&maxPrice=40');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(s => s.price >= 20 && s.price <= 40)).toBe(true);
  });
});
