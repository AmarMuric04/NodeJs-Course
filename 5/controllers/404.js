exports.getPageNotFound = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", {
    docTitle: "Page Not Found",
    activeShop: false,
    activeAddProduct: false,
  });
};
