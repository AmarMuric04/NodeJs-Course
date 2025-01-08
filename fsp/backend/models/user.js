const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "member",
  },
  // posts: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Post",
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);
