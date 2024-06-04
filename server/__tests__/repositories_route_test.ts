import request from "supertest";
import server from "../src/index";


describe("Repositories Routes", () => {
  // After running the tests, close the server
    afterAll((done) => {
      server.close(done);
    });
  
    it("GET /:accountId/:repoName should get single repository data with name", async () => {
      const res = await request(server).get('/repository/1/testrepo');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.repositories)).toBe(true);
      expect(res.body.repositories[0].repositoryName).toBe('testrepo');
    });


    it('GET /:accountId should return all repositories data', async () => {
      const res = await request(server).get('/repository/1');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.repositories)).toBe(true);
      expect(res.body.repositories.length).toBeGreaterThan(0);
    });


    it('POST /:accountId/:repoName/scan-on-push should toggle scan on push setting', async () => {
      const res = await request(server).post('/repository/1/testrepo/scan-on-push');
      expect (res.status).toBe(200);
    });


  });
  