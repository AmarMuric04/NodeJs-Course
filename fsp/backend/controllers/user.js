const User = require("../models/user");
const Post = require("../models/post");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed.");
      validationError.statusCode = 422;
      validationError.data = errors.array();

      throw validationError;
    }

    const { fname, lname, email, password, about } = req.body;

    let imageUrl;
    if (req.file) imageUrl = req.file.path.replace("\\", "/");
    else imageUrl = "images/default.jpg";

    const hashedPw = await bcrypt.hash(password, 15);

    const user = new User({
      fname,
      lname,
      email,
      imageUrl,
      password: hashedPw,
      about,
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

exports.signin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed.");
      validationError.statusCode = 422;
      validationError.data = errors.array();

      throw validationError;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User with given email does not exist.");
      error.statusCode = 404;
      error.data = [
        {
          path: "email",
        },
      ];

      throw error;
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      error.data = [
        {
          path: "password",
        },
      ];

      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Signed in!",
      data: {
        userId: user._id.toString(),
        token,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(new mongoose.Types.ObjectId(id));
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({ message: "User fetched successfully!", user });
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

exports.getBookmarked = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const bookmarkedPosts = await Post.find({ bookmarks: userId }).populate(
      "creator"
    );

    res.status(200).json({
      message: "Fetched bookmarked posts successfully",
      data: bookmarkedPosts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getLiked = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const likedPosts = await Post.find({ likes: userId }).populate("creator");

    res.status(200).json({
      message: "Fetched bookmarked posts successfully",
      data: likedPosts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await User.find().countDocuments();

    res.json({ message: "Successfully got user count.", data: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getUserBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const user = await User.findOne({ slug })
      .populate("following")
      .populate("followers");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const posts = await Post.find({ creator: user._id }).populate("creator");

    res.json({ message: "Successfully got user count.", data: posts });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.toggleFollow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(req.userId);

    if (id === currentUser.id) {
      const error = new Error("You can't follow yourself.");
      error.statusCode = 400;
      throw error;
    }

    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      userToFollow.followers = userToFollow.followers.filter(
        (followerId) => followerId.toString() !== currentUser.id.toString()
      );
      currentUser.following = currentUser.following.filter(
        (followingId) => followingId.toString() !== id.toString()
      );

      await userToFollow.save();
      await currentUser.save();

      return res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      userToFollow.followers.push(currentUser.id);
      currentUser.following.push(id);

      await userToFollow.save();
      await currentUser.save();

      return res.status(200).json({ message: "User followed successfully." });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed.");
      validationError.statusCode = 422;
      validationError.data = errors.array();
      throw validationError;
    }

    let imageUrl = "images/default.jpg";
    if (req.files && req.files["image"] && req.files["image"][0]) {
      imageUrl = req.files["image"][0].path.replace(/\\/g, "/");
    }

    let bannerImage = "images/default-bg.jpg";
    if (req.files && req.files.banner && req.files.banner[0]) {
      bannerImage = req.files.banner[0].path.replace(/\\/g, "/");
    }

    const user = await User.findById(id);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    if (imageUrl) user.imageUrl = imageUrl;
    if (bannerImage) user.bannerImage = bannerImage;

    const updateFields = req.body;
    console.log(updateFields);

    Object.keys(updateFields).forEach((key) => {
      const value = updateFields[key];
      if (typeof value === "string") {
        try {
          const parsedValue = JSON.parse(value);
          if (Array.isArray(parsedValue) || typeof parsedValue === "object") {
            user[key] = parsedValue;
          } else {
            user[key] = value;
          }
        } catch {
          user[key] = value;
        }
      } else {
        user[key] = value;
      }
    });

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
};
