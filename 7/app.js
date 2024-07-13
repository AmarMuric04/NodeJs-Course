const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

const errorController = require("./controllers/404");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(errorController.getPageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Amar",
        email: "amar@amar.com",
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
