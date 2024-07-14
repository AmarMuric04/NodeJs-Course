const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

const errorController = require("./controllers/404");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66931c71e61ba18f1a50f7d3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(errorController.getPageNotFound);

mongoConnect(() => app.listen(3000));
