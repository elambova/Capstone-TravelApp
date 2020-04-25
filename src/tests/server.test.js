const request = require("supertest");
const app = require("../server/server");

describe("api", () => {
  describe("get /getInfo", () => {
    test("should return a 200", async () => {
      const response = await request(app).get("/getInfo");
      expect(response.status).toBe(200);
    });
  });
});
