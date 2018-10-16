const chai = require("chai");

const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../../server");

describe("routes : index", () => {
  describe("GET /", () => {
    it("should return json", done => {
      chai
        .request(server)
        .get("/v1/example")
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.status.should.equal("success");
          res.body.data.should.eql("Backend says hi");
          done();
        });
    });
  });
});
