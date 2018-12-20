const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");

describe("GET /getAccounts", () => {
  it("should get all accounts", done => {
    request(app)
      .get("/getAccounts")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(10);
      })
      .end(done);
  });
});

describe("GET /certificate/data/:id", () => {
  it("should return 400 status code for incorrect or invalid certificate id", done => {
    const certificateId = "43k34jk43j5kj53kj";
    request(app)
      .get(`/certificate/data/${certificateId}`)
      .expect(400)
      .expect(res => {
        expect(Object.keys(res.body)[0]).toEqual("err");
      })
      .end(done);
  });
});
