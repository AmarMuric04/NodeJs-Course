const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            res.flash("error", "Invalid email or password");
            return res.redirect("/login");
          }
        });
      } else {
        req.flash("error", "Invalid email or password");
        return res.redirect("login");
      }
    })
    .catch((err) => console.log(err));
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      req.flash("error", "User with the same email already exits.");
      return res.redirect("/signup");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match!");
      return res.redirect("/signup");
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      cart: { items: [] },
    });
    await newUser.save();

    console.log("User created, now Log in!");
    res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
