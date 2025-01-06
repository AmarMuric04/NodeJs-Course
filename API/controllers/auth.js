const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const validationError = new Error("Validation failed.");
    validationError.statusCode = 422;
    validationError.data = error.array();

    throw validationError;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        password: hashedPw,
        name,
      });

      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created successfuly!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("User with this email does not exist.");
        error.statusCode = 401;

        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;

        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Logged in!",
        userID: loadedUser._id.toString(),
        token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
