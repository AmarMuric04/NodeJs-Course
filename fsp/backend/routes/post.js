const express = require("express");

const router = express.Router();

const Controller = require("../controllers/post");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

router.post(
  "/",
  isAuth,
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 8 chars long."),
    body("content")
      .isLength({ min: 5 })
      .withMessage("Content must be at least 8 chars long."),
      body()
  ],
  Controller.createPost
);

module.exports = router;
