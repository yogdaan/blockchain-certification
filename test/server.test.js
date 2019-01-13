const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");

const obj = {
  candidateName: "Saurabh Thakur",
  courseName: "Full Stack Nanodegree",
  orgName: "Udacity",
  assignDate: 1545316652295,
  duration: 2
};

describe("POST /certificate/generate", () => {
  it("should save the data in the blockchain", done => {
    request(app)
      .post("/certificate/generate")
      .send(obj)
      .expect(201)
      .expect(res => {
        expect(res.body.receipt).toBeDefined();
        expect(res.body.data).toBeDefined();
        const {
          candidateName,
          courseName,
          orgName,
          expirationDate
        } = res.body.data;
        expect(candidateName).toEqual(obj.candidateName);
        expect(courseName).toEqual(obj.courseName);
        expect(orgName).toEqual(obj.orgName);
        const tempDate = new Date(obj.assignDate);
        tempDate.setFullYear(tempDate.getFullYear() + obj.duration);
        expect(expirationDate).toEqual(tempDate.getTime());
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

  it("should get correct data for already registered candidate", done => {
    let certificateId = "";
    request(app)
      .post("/certificate/generate")
      .send(obj)
      .expect(res => {
        certificateId = res.body.data.certificateId;
        request(app)
          .get(`/certificate/data/${certificateId}`)
          .expect(200)
          .expect(res => {
            const {
              candidateName,
              courseName,
              orgName,
              expirationDate
            } = res.body;
            expect(Object.keys(res.body).length).toBe(4);
            expect(candidateName).toEqual(obj.candidateName);
            expect(courseName).toEqual(obj.courseName);
            expect(orgName).toEqual(obj.orgName);
            const tempDate = new Date(obj.assignDate);
            tempDate.setFullYear(tempDate.getFullYear() + obj.duration);
            expect(expirationDate).toEqual(tempDate.getTime().toString());
          });
      })
      .end(done);
  });
});

describe("GET /certificate/verify/data/:id", () => {
  it("should return 200 status code if certificate is verified", done => {
    let certificateId = "";
    request(app)
      .post("/certificate/generate")
      .send(obj)
      .expect(res => {
        certificateId = res.body.data.certificateId;
        request(app)
          .get(`/certificate/verify/${certificateId}`)
          .expect(200);
      })
      .end(done);
  });

  it("should return 400 status code for incorrect or invalid certificate id", done => {
    let certificateId = "abcabc123123";
    request(app)
      .get(`/certificate/verify/${certificateId}`)
      .expect(400)
      .end(done);
  });
});
