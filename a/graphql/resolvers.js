const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const email = userInput.email;
    const password = userInput.password;
    const name = userInput.name;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "E-mail is invalid." });
    }

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      errors.push({ message: "Password is invalid." });
    }

    if (validator.isEmpty(name)) {
      errors.push({ message: "Name is invalid." });
    }

    if (errors.length > 0) {
      const error = new Error("Validation failed.");
      error.data = errors;
      error.code = 422;

      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      const error = new Error("User with that email already exists.");
      error.statusCode = 409;

      throw error;
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
};
