import request from 'supertest';
import server from '../src/index';

describe('GET /', () => {
  afterAll(() => {
    server.close(); // Close the server after all tests are done
  });

  it('should return 200 and a message', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('FennECR ts server is running.');
  });
});
