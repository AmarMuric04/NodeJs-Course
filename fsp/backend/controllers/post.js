const Post = require("../models/post");
// const { validationResult } = require("express-validator");

exports.createPost = async (req, res, next) => {
  const { title, location, date, content, tags, links } = req.body;
  const parsedTags = JSON.parse(tags);
  const parsedLinks = JSON.parse(links);

  const tagValues = [];
  const linkValues = [];

  const imageUrl = req.file?.path?.replace("\\", "/");

  Object.entries(parsedTags).forEach(([key, value]) => {
    if (value.value === "") return;
    tagValues.push(value.value);
  });

  Object.entries(parsedLinks).forEach(([key, value]) => {
    if (value.value === "") return;
    linkValues.push(value.value);
  });

  try {
    const post = new Post({
      title,
      location,
      date,
      content,
      tags: tagValues,
      links: linkValues,
      imageUrl: imageUrl,
      creator: req.userId,
    });

    await post.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
