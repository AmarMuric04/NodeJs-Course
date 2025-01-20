const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();

async function updateUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find();

    for (const user of users) {
      user.bannerImage = "/images/default-bg.png";
      delete user.bannerImg;

      await user.save();
    }

    console.log("All users have been updated!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating users:", error);
    mongoose.connection.close();
  }
}

updateUsers();
