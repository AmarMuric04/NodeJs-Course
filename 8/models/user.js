const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();

    console.log("User added!");
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (prod) => prod.productId.toString() === product._id.toString()
    );
    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: product._id, quantity: newQuantity });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        {
          _id: this._id,
        },
        { $set: { cart: updatedCart } }
      )
      .catch((err) => console.log(err));
  }

  getCart() {
    const db = getDb();

    const productIds = this.cart.items.map((prod) => prod.productId);

    /* basically what this does is...ǐ̴̧͇͔̳̯̦̺̩̺͎̙͈͇͗̿ ̷̤͚͊͑͋́̔̆́͋̅͑̀̀̚̚͝ḩ̴̹̹͚̙̯͕̊̑̓̿̆͒̂̈̏ą̶̘̗͉̗̟̞̮̻̲͇̹̝̎͒̍̌̂̿̓̏͑̾̾̑ͅv̸̧̢̳̗̼͍͕̑̚̚̚e̷̡͍͇͙͖̱̅̃̓̽͋͊̏̿̕̚ͅͅ ̷̖̽̈́̊̚ǹ̷̨̛̞̬͙͙̦̰̼̼̋ọ̸̧̢̺͕̜̠̤͙̬̥̋̈́̋̑̈́͗͒̃̔̅̕̕͠͝ͅ ̵̭̪͇͕̂̆̔̈́̍̑̄͠ͅf̵̡̮͈̗̝̼̤̮̘̠͗̋͗͑̎̏̓̂͝u̸̲͍͕̺̲̼̖̦̝͉̽̆̚͜ć̶̨͕͓̔̐͗̽̐͊͐̀̄͝͝͝ḱ̶͕̯̘̗̼̟͇̞͉͔̽̓̂̓̔͑͝ǐ̵̭͙̮̯̟͙̫͔̗͔̀̊̆̿͒̓̅̾̓̐͆͜n̵͎̦͙̄̄̅͗͊̓̉̏ģ̶͚̱̿̒̌̊̇̒̔̂̕ ̷̡̡̛͉͔̣̮͔͈̣̩̌̒̌̋̏͌͆̈͐͒͑͜͜͠͠ī̷̲͖̯̦̪͎̤̹̮̹͋̒́̔̈́͛͝ḑ̵̢̯̣͇͎͓̈́̾̈́ȩ̵̡͍͔̲͈͍͉͖̩̱̻̯̠͇̓͊̅̈̀͘͝ả̵̦͔̲͎͕̃̿̀͑̈́̿̃̈́̑ */

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          return {
            ...prod,
            quantity: this.cart.items.find(
              (p) => p.productId.toString() === prod._id.toString()
            ).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(id) })
      .then((user) => user)
      .catch((err) => console.log(err));
  }
}

module.exports = User;
