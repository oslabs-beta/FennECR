import request from 'supertest';
import server from '../src/index';

describe('Image Routes', () => {
  // After running the tests, close the server
  afterAll((done) => {
    server.close(done);
  });

  it('GET /:accountId/:repoName should return images details', async () => {
    const res = await request(server).get('/images/DEV/testrepo');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
  });
});
