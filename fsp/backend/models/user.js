const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bannerImage: {
      type: String,
      default: "default-bg.png",
    },
    location: {
      type: String,
    },
    birth: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    visibility: {
      type: String,
    },
    comments: {
      type: String,
    },
    gender: {
      type: String,
    },
    activeToken: {
      type: String,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
