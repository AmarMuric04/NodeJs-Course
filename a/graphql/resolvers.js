const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

  createPost: async function ({ postInput }, req) {
    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid" });
    }

    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid" });
    }

    if (errors.length > 0) {
      const error = new Error("Validation failed.");
      error.data = errors;
      error.code = 422;

      throw error;
    }

    const post = await new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
    });

    const createdPost = await post.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },

  login: async function ({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found.");
      error.code = 404;

      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Incorrect credentials...");
      error.code = 401;

      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "secret",
      { expiresIn: "1h" }
    );

    return { token, userId: user._id.toString() };
  },
};
