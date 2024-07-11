exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout Page",
    path: "/checkout",
    activeCheckout: true,
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Cart Page",
    path: "/cart",
    activeCart: true,
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Order Page",
    path: "/orders",
    activeCart: true,
  });
};
