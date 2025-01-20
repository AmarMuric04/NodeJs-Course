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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let nameSlug = slugify(this.name, { lower: true, replacement: "-" });

    let slug = nameSlug;
    let counter = 1;

    while (await mongoose.models.User.findOne({ slug })) {
      slug = `${nameSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
