const express = require("express");

const router = express.Router();

const Controller = require("../controllers/post");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

router.post("/", isAuth, Controller.createPost);

module.exports = router;
