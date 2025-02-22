import { expect } from "chai";
import sinon from "sinon";
import User from "../models/user.js";
import * as AuthController from "../controllers/auth.js";
import mongoose from "mongoose";

describe("Auth Controller", () => {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://muricamar2004:Kolosseum123@nodejs.vbqigm9.mongodb.net/test-messages?retryWrites=true&w=majority",
        { useUnifiedTopology: true, useNewUrlParser: true }
      )
      .then(() => {
        const user = new User({
          email: "test@gmail.com",
          password: "123",
          name: "Tester",
          posts: [],
          _id: "5c0f66b979af55031b34628a",
        });

        return user.save();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });

  it("Should throw an error w/status code 500 if accessing the database fails", (done) => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@gmail.com",
        password: "123",
      },
    };

    AuthController.login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      })
      .catch(done)
      .finally(() => {
        User.findOne.restore();
      });
  });

  it("Should send a response with a valid user status for an existing user", (done) => {
    const req = { userId: "5c0f66b979af55031b34628a" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.userStatus = data.status;
      },
    };

    AuthController.getUserStatus(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal("I am new!");
        done();
      })
      .catch(done);
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
      .catch(done);
  });
});
