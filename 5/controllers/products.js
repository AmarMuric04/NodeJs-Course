const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("add-product", {
    docTitle: "Products",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      products,
      hasProducts: products.length > 0,
      docTitle: "Shop",
      path: "/",
      activeShop: true,
      productCSS: true,
    });
  });
};
