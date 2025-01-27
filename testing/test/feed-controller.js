import { expect } from "chai";
import sinon from "sinon";
import User from "../models/user.js";
import * as FeedController from "../controllers/feed.js";
import mongoose from "mongoose";

describe("Feed Controller", () => {
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

  it("Should add a created post to the posts of the creator", (done) => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        title: "Post",
        content: "A Test Post",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34628a",
    };

    const res = {
      status(status) {
        return this;
      },
      json() {},
    };

    FeedController.createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done();
      })
      .catch(done)
      .finally(() => {
        User.findOne.restore();
      });
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
