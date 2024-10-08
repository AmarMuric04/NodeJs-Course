const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const expressHbs = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");
const errorController = require("./controllers/404");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(errorController.getPageNotFound);

app.listen(3000);
