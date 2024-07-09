const path = require("path");

const express = require("express");

const adminData = require("./admin");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", {
    products: adminData.products,
    docTitle: "Shop",
    path: "/",
  });
});

module.exports = router;
