const path = require("path");

const express = require("express");

// const rootDir = require("../utils/path");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/add-product", productsController.getAddProduct);

router.post("/product", productsController.postAddProduct);

module.exports = router;
