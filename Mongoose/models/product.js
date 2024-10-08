const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const { ObjectId } = require("mongodb");

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }

//     return dbOp
//       .then((result) => console.log(result))
//       .catch((err) => console.log(err));
//   }

//   static deleteById(id) {
//     const db = getDb();

//     return db
//       .collection("products")
//       .deleteOne({ _id: ObjectId.createFromHexString(id) })
//       .then(() => console.log("Item deleted"))
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => products)
//       .catch((err) => console.log(err));
//   }

//   static fetchById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: ObjectId.createFromHexString(id) })
//       .next()
//       .then((product) => product)
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
