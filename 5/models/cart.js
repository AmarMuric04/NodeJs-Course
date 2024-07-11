const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(data);
      }

      const existingProduct = cart.products.find((prod) => prod.id === id);
      let updatedProduct;
      if (existingProduct) {
        const index = cart.products.findIndex((prod) => prod.id === id);
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity++;
        cart.products[index] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totalPrice += +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.error(err);
      });
    });

    console.log("Added!");
  }
};
