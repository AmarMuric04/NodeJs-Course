const express = require("express");

const mongoose = require("mongoose");

const app = express();

const userRouter = require("./routes/user");

require("dotenv").config();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

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
