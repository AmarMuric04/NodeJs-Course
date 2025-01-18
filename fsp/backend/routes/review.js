const Controller = require("../controllers/review.js");

const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

router.get("/count", Controller.getCount);

router.get("/average", Controller.getAverage);

router.get("/most-rated", Controller.getMostRated);

router.get("/anonymous-percentage", Controller.getAnonymousPercentage);

router.get("/", Controller.getReviews);

router.post(
  "/",
  [
    body("rating")
      .exists()
      .withMessage("A rating is required.")
      .custom((value) => {
        if (value <= 0) {
          return Promise.reject("A rating is required.");
        }
        return true;
      }),
    body("message")
      .not()
      .isEmpty()
      .withMessage("Please provide some feedback."),
  ],
  Controller.postReview
);

module.exports = router;
