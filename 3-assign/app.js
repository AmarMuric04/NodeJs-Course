const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Page loaded.");
  next();
});

app.use("/users", (req, res, next) => {
  console.log("You are in the users page!");
  res.send("<h1>Users page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("You are in the home page!");
  res.send("<h1>Home page</h1>");
});

app.listen(3000);
