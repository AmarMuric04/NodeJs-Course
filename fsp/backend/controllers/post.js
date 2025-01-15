const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const validationErrors = errors.array();

    // if (!req.file) {
    //   validationErrors.push({
    //     path: "imageUrl",
    //     msg: "Image field is required!",
    //   });
    // }

    if (validationErrors.length > 0) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = validationErrors;
      throw error;
    }

    const { title, location, date, content, tags, links } = req.body;
    const parsedTags = JSON.parse(tags);
    const parsedLinks = JSON.parse(links);

    const tagValues = Object.values(parsedTags)
      .filter((tag) => tag.value !== "")
      .map((tag) => tag.value);

    const linkValues = Object.values(parsedLinks)
      .filter((link) => link.value !== "")
      .map((link) => link.value);

    let imageUrl;
    if (req.file) imageUrl = req.file.path.replace("\\", "/");

    const post = new Post({
      title,
      location,
      date,
      content,
      tags: tagValues,
      links: linkValues,
      imageUrl,
      creator: req.userId,
      likes: [],
      bookmarks: [],
    });

    await post.save();

    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    res.status(201).json({ message: "Post created successfully!", data: post });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  const { page } = req.query;
  try {
    const count = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .limit(page * 5);

    res
      .status(200)
      .json({ message: "Posts fetched successfully!", data: posts, count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts.", error });
  }
};

exports.toggleLike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);

    if (post.creator.toString() === userId.toString()) {
      const error = new Error("Can't like your own post.");
      error.statusCode = 403;

      throw error;
    }

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ message: "Like status updated", likes: post.likes });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.toggleBookmark = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.creator.toString() === userId.toString()) {
      const error = new Error("Can't bookmark your own post.");
      error.statusCode = 403;

      throw error;
    }

    if (post.bookmarks.includes(userId)) {
      post.bookmarks.pull(userId);
    } else {
      post.bookmarks.push(userId);
    }

    await post.save();
    res
      .status(200)
      .json({ message: "Bookmark status updated", bookmarks: post.bookmarks });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.countView = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post.views.includes(req.userId)) {
      post.views.push(req.userId);
      await post.save();
    }

    res.status(200).send("View count updated.");
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
