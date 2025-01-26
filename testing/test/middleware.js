import authMiddleware from "../middleware/is-auth.js";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";

describe("Auth middleware", () => {
  it("Should throw an error ('Not authenticated') if no authorization header is present.", () => {
    const req = {
      get: () => {
        return null;
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated"
    );
  });

  it("Should throw an error ('Not authenticated') if the authorization header is only one string", () => {
    const req = {
      get: () => {
        return "Bearer";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("Should throw an error if the token can't be verified", () => {
    const req = {
      get: () => {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("Should return a userId after decoding the token", () => {
    const req = {
      get: () => {
        return "Bearer xyz";
      },
    };

    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abc",
    });

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
