const Review = require("../models/review.js");

const { validationResult } = require("express-validator");

exports.postReview = async (req, res, next) => {
  try {
    const { message, user, rating, anonymous } = req.body;

    const errors = validationResult(req);
    const validationErrors = errors.array();
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = validationErrors;
      throw error;
    }

    let newReview;
    if (anonymous) {
      const alreadyReviewed = await Review.findOne({ information: req.ip });

      if (alreadyReviewed) {
        const error = new Error("You have already reviewed.");
        error.statusCode = 409;

        throw error;
      }

      newReview = new Review({
        message,
        rating,
        information: req.ip,
        anonymous,
      });
    } else if (!anonymous) {
      const alreadyReviewed = await Review.findOne({ user: user });

      if (alreadyReviewed) {
        const error = new Error("You have already reviewed.");
        error.statusCode = 409;

        throw error;
      }

      newReview = new Review({
        message,
        rating,
        user,
        anonymous,
      });
    }

    await newReview.save();

    res.json({ message: "Successfully created a review.", review: newReview });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("user");

    res.json({ message: "Successfully fetched reviews.", data: reviews });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
