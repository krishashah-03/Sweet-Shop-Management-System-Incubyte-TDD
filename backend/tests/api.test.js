describe('API Health & Error Tests', () => {
  it('should return 200 for /health check route', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 for invalid route', async () => {
    const res = await request(app).get('/invalid-route');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
