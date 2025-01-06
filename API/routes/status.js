const express = require("express");

const statusController = require("../controllers/status");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const { body } = require("express-validator");

router.get("", isAuth, statusController.getStatus);
router.put(
  "",
  isAuth,
  [body("status").trim().not().isEmpty()],
  statusController.updateStatus
);

module.exports = router;
