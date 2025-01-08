const express = require("express");

const router = express.Router();

const Controller = require("../controllers/user");

const { body } = require("express-validator");

router.get("/", Controller.getUsers);

router.post(
  "/",
  [
    body("fname").not().isEmpty().withMessage("Must provide first name."),
    body("lname").not().isEmpty().withMessage("Must provide last name."),
    body("email").not().isEmpty().isEmail().withMessage("Provide valid email."),
  ],
  Controller.postUser
);

module.exports = router;
