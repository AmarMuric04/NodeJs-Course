const express = require("express");

const productsController = require("../controllers/shop/products");
const orderController = require("../controllers/shop/order");
const indexController = require("../controllers/shop/index");

const router = express.Router();

router.get("/checkout", orderController.getCheckout);

router.get("/cart", orderController.getCart);

router.get("/orders", orderController.getOrders);

router.get("/product-list", productsController.getProductList);

router.get("/", indexController.getIndex);

module.exports = router;
