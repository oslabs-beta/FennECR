const request = require('supertest');
const app = require('../src/index');


describe('GET /', () => {
  it('should return 200 and a message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('InsightECR ts server is running.');
  });
});