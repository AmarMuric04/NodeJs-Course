const Product = require("../../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Products",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  console.log(req.body);
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      products,
      docTitle: "Admin Products",
      path: "/admin/product-list",
      productCSS: true,
      activeAdminProductList: true,
    });
  });
};
