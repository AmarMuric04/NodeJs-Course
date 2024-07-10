exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout Page",
    path: "/checkout",
    activeCheckout: true,
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    docTitle: "Cart Page",
    path: "/cart",
    activeCart: true,
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    docTitle: "Order Page",
    path: "/orders",
    activeCart: true,
  });
};
