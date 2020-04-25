const request = require("supertest");
const app = require("../server/server");

describe("api", () => {
  describe("get /all", () => {
    it("should return a 200", () => {
      request(app)
        .get("/all")
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
  describe("get /getInfo", () => {
    test("should return a 200", async () => {
      const response = await request(app).get("/getInfo");
      expect(response.status).toBe(200);
    });
  });
});
