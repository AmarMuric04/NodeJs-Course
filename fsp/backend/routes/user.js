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

router.get("/:id", Controller.getUser);

router.get("/:id/bookmarked", isAuth, Controller.getBookmarked);

router.get("/:id/liked", isAuth, Controller.getLiked);

module.exports = router;
