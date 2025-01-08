const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.postUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed.");
      validationError.statusCode = 422;
      validationError.data = errors.array();

      throw validationError;
    }

    const { fname, lname, email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 15);

    const user = new User({
      fname,
      lname,
      email,
      password: hashedPw,
    });

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      const error = new Error("A user with that email already exists.");
      error.statusCode = 409;
      error.data = [
        {
          path: "email",
        },
      ];

      throw error;
    }
    await user.save();

    res.status(201).json({ message: "User created successfuly!", user });
    console.log("User created.");
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ message: "Users fetched successfully!", users });
};
