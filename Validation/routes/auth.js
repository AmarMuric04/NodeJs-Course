const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email.").normalizeEmail(),
    body("password", "Invalid password.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            console.log(userDoc);
            return Promise.reject(
              "E-mail already exists, please pick a different one."
            );
          }
        });
      }).normalizeEmail,
    body("password", "Invalid password input.")
      .isLength({ min: 5, max: 25 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
