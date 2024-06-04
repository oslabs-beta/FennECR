import request from 'supertest';
import server from '../src/index'; 

describe('Scan Results Routes', () => {
    // After running the tests, close the server
    afterAll((done) => {
      server.close(done);
    });
  
  it('GET /:accountId/:repoName should return aggregated scan results', async () => {
    const res = await request(server).get('/results/1/testrepo'); 
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('imageScanned'); 
    expect(res.body).toHaveProperty('vulnerbleImageCount');
    expect(res.body).toHaveProperty('severityCounts');

  });
});
