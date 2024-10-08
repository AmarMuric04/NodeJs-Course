const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    docTitle: "Products",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.post("/product", (req, res) => {
  console.log(req.body);
  products.push({
    title: req.body.title,
  });
  res.redirect("/");
});

module.exports = {
  routes: router,
  products: products,
};
