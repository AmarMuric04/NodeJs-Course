exports.getPageNotFound = (req, res) => {
  res.status(404).render("404", {
    docTitle: "Page Not Found",
    activeShop: false,
    activeAddProduct: false,
    path: "",
  });
};
