const Product = require("../../models/product");

exports.getProductList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      hasProducts: products.length > 0,
      docTitle: "Product Page",
      path: "/product-list",
      activeProductList: true,
      productCSS: true,
    });
  });
};
