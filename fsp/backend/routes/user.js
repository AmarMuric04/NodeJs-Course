const express = require("express");

const router = express.Router();

const Controller = require("../controllers/user");

const { body } = require("express-validator");

router.get("/users", Controller.getUsers);

router.get("/:id", Controller.getUser);

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

module.exports = router;
