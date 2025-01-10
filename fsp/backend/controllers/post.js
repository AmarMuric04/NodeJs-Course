const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const validationErrors = errors.array();

    if (!req.file) {
      validationErrors.push({
        path: "imageUrl",
        msg: "Image field is required!",
      });
    }

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

    const imageUrl = req.file.path.replace("\\", "/");

    const post = new Post({
      title,
      location,
      date,
      content,
      tags: tagValues,
      links: linkValues,
      imageUrl,
      creator: req.userId,
    });

    await post.save();

    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    res.status(201).json({ message: "Post created successfully!", post });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
