describe('Sorting Tests', () => {
  it('should sort sweets by price ascending', async () => {
    const res = await request(app).get('/sweets/sort?by=price&order=asc');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].price <= res.body[1].price).toBe(true);
  });

  it('should sort sweets by quantity descending', async () => {
    const res = await request(app).get('/sweets/sort?by=quantity&order=desc');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].quantity >= res.body[1].quantity).toBe(true);
  });
});
