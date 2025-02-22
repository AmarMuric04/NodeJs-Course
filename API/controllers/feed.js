const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const io = require("../socket");
const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  let totalItems;
  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip(currentPage - 1)
        .limit(perPage)
        .then((posts) => {
          res.status(200).json({
            message: "Posts fetched successfully",
            posts,
            totalItems,
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;
  let creator;
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace("\\", "/");

  Post.findOne({ title: title })
    .then((post) => {
      console.log(post);
      if (post) {
        return res.status(409).json({
          message: "A post with that title already exists.",
        });
      }

      const newPost = new Post({
        title,
        content,
        imageUrl,
        creator: req.userId,
      });
      newPost
        .save()
        .then((result) => {
          return User.findById(req.userId);
        })
        .then((user) => {
          creator = user;
          user.posts.push(newPost);
          return user.save();
        })
        .then((result) => {
          io.getIO().emit("posts", {
            action: "create",
            post: post,
          });
          res.status(201).json({
            message: "Post created successfully!",
            post: newPost,
            creator: {
              _id: creator._id,
              name: creator.name,
            },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;

        throw error;
      }

      res.status(200).json({ message: "Post fetched.", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path.replaceAll("\\", "/");
  }

  if (!imageUrl) {
    const error = new Error("No file provided.");
    error.statusCode = 422;

    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No file provided.");
        error.statusCode = 422;

        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Insufficient access.");
        error.statusCode = 403;

        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;

      return post.save();
    })
    .then((post) => {
      res.status(200).json({ message: "Post updated successfully!", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No file provided.");
        error.statusCode = 422;

        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Insufficient access.");
        error.statusCode = 403;

        throw error;
      }
      clearImage(deletePost.imageUrl);
      return Post.findByIdAndDelete(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);

      return user.save();
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted post." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
