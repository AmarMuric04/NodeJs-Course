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

exports.getCount = async (req, res, next) => {
  try {
    const count = await Review.find().countDocuments();

    res.json({ message: "Successfully got review count.", data: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getAverage = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    const sum = reviews.reduce((a, b) => a + b.rating, 0);

    const avg = sum / reviews.length;

    res.json({
      message: "Successfully got review count.",
      data: avg.toFixed(2),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getMostRated = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    if (!reviews.length) {
      return res.status(200).json({
        message: "No reviews found.",
        data: null,
      });
    }

    const ratingCounts = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    const mostGivenRating = Object.keys(ratingCounts).reduce((a, b) =>
      ratingCounts[a] > ratingCounts[b] ? a : b
    );

    res.json({
      message: "Successfully got review count.",
      data: Number(mostGivenRating),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getAnonymousPercentage = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      return res.status(200).json({
        message: "No reviews found.",
        data: {
          anonymousPercentage: 0,
        },
      });
    }

    const anonymousCount = reviews.reduce((acc, review) => {
      return acc + (review.anonymous ? 1 : 0);
    }, 0);

    const anonymousPercentage = ((anonymousCount / totalReviews) * 100).toFixed(
      2
    );

    res.json({
      message: "Successfully calculated anonymous ratings percentage.",
      data: Number(anonymousPercentage).toFixed(2),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
