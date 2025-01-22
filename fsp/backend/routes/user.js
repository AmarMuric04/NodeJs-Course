const express = require("express");

const router = express.Router();

const Controller = require("../controllers/user");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

router.get("/users", Controller.getUsers);

router.get("/count", Controller.getCount);

router.post(
  "/signin",
  [
    body("email").not().isEmpty().isEmail().withMessage("Provide valid email."),
    body("password").isLength({ min: 8 }).withMessage("Minimum 8 characters."),
  ],
  Controller.signin
);

router.post(
  "/signup",
  [
    body("fname").not().isEmpty().withMessage("Must provide first name."),
    body("lname").not().isEmpty().withMessage("Must provide last name."),
    body("email").not().isEmpty().isEmail().withMessage("Provide valid email."),
    body("password").isLength({ min: 8 }).withMessage("Minimum 8 characters."),
    body("about").not().isEmpty().withMessage("Can't be empty."),
  ],
  Controller.signup
);

router.get("/profile/:slug", Controller.getUserBySlug);

router.put(
  "/:id/edit-profile",
  [
    body("fname").not().notEmpty().withMessage("Must provide first name."),
    body("lname").not().notEmpty().withMessage("Must provide last name."),
  ],
  isAuth,
  Controller.editProfile
);

router.get("/:id/posts", Controller.getPosts);

router.get("/:id/bookmarked", Controller.getBookmarked);

router.get("/:id/liked", Controller.getLiked);

router.post("/:id/toggle-follow", isAuth, Controller.toggleFollow);

router.get("/:id", Controller.getUser);

module.exports = router;
