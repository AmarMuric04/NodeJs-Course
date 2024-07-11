const express = require("express");

const adminProductsController = require("../controllers/admin/products");

const router = express.Router();

router.get("/add-product", adminProductsController.getAddProduct);

// router.get("/edit-product", adminProductsController.getEditProduct);

router.get("/products", adminProductsController.getAdminProducts);

router.post("/product", adminProductsController.postAddProduct);

module.exports = router;
