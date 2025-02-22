const express = require("express");

const router = express.Router();

const Controller = require("../controllers/post");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

router.get("/count", Controller.getCount);

router.get("/likes", Controller.getLikes);

router.get("/bookmarks", Controller.getBookmarks);

router.post("/:postId/like", isAuth, Controller.toggleLike);

router.post("/:postId/bookmark", isAuth, Controller.toggleBookmark);

router.post("/:postId/view", isAuth, Controller.countView);

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
    body(),
  ],
  Controller.createPost
);

router.get("/", Controller.getPosts);

module.exports = router;
