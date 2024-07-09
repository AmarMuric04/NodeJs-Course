const express = require("express");
const path = require("path");

const userRoutes = require("./routes/page");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname, "views", "404.html");
});

app.listen(3000);
