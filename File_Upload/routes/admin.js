const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { check, body } = require("express-validator");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    isAuth,
    body("title", "Invalid title").isLength({ min: 3 }).trim(),
    body("imageUrl", "Invalid URL").isURL(),
    body("price", "Invalid pricing").isFloat(),
    body("description", "Invalid description")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  [
    isAuth,
    body("title", "Invalid title").isLength({ min: 3 }).trim(),
    body("price", "Invalid pricing").isFloat(),
    body("description", "Invalid description")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    isAuth,
    body("title", "Invalid title").isLength({ min: 3 }).trim(),
    body("price", "Invalid pricing").isFloat(),
    body("description", "Invalid description")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
