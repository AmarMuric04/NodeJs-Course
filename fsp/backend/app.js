const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const reviewRouter = require("./routes/review");
require("dotenv").config();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

/* Dozvoli CORS */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, `${uuidv4()}.${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg formats are allowed"), false);
  }
};

app.use(
  multer({ storage, fileFilter }).fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ])
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.use("/reviews", reviewRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");

    app.listen(8080);
    console.log("Server is running on port 8080.");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

startApp();
