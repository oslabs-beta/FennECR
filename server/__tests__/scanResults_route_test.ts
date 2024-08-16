import request from 'supertest';
import server from '../src/index';

describe('Scan Results Routes', () => {
  // After running the tests, close the server
  afterAll((done) => {
    server.close(done);
  });

  it('GET /:accountId/:repoName/:imageTag should return single scan results of given image', async () => {
    const res = await request(server).get('/results/DEV/testrepo/juice-shop');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('$metadata');
    expect(res.body).toHaveProperty('imageId');
    expect(res.body).toHaveProperty('imageScanFindings');
    expect(res.body.imageScanFindings).toHaveProperty('findings'); // Check within imageScanFindings object
    expect(res.body.imageScanFindings).toHaveProperty('findingSeverityCounts'); // Additional property check
    expect(res.body).toHaveProperty('imageScanStatus');
    expect(res.body).toHaveProperty('registryId');
    expect(res.body).toHaveProperty('repositoryName');
  });

  it('GET /:accountId/:repoName should return aggregated scan results', async () => {
    const res = await request(server).get('/results/DEV/testrepo');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('imageScanned');
    expect(res.body).toHaveProperty('vulnerbleImageCount');
    expect(res.body).toHaveProperty('severityCounts');
  });
});
