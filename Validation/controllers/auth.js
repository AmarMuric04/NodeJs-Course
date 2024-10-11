const crypto = require("crypto");

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMail = require("../util/email-sender");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email,
        password,
      },
      validationErrors: errors.array(),
    });
  }
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
            return res.status(422).render("auth/login", {
              path: "/login",
              pageTitle: "Login",
              isAuthenticated: false,
              errorMessage: "Invalid email or password",
              oldInput: {
                email,
                password,
              },
              validationErrors: [{ path: "email", path: "password" }],
            });
          }
        });
      } else {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          isAuthenticated: false,
          errorMessage: errors.array()[0].msg,
          oldInput: {
            email,
            password,
          },
          validationErrors: [{ path: "email", path: "password" }],
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email,
          password,
          confirmPassword,
        },
        validationErrors: errors.array(),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      cart: { items: [] },
    });
    await newUser.save();

    await sendMail(
      "murga@demomailtrap.com",
      email,
      "Sign-up successful!",
      "You successfully signed up! Congrats!"
    );
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

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: req.flash("error")[0],
  });
};
exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) return res.redirect("/reset");

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account found under given email.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save().then(() => {
          res.redirect("/");
          sendMail(
            "murga@demomailtrap.com",
            req.body.email,
            "Reset Password!",
            "Password reset",
            `<p>You requested a password reset </p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.`
          );
        });
      })

      .catch((err) => console.log(err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: {
      $gt: Date.now(),
    },
  })
    .then((user) => {
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        isAuthenticated: false,
        errorMessage: req.flash("error")[0],
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  let origUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {
      $gt: Date.now(),
    },
    _id: userId,
  })
    .then((user) => {
      origUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      origUser.password = hashedPassword;
      origUser.resetToken = null;
      origUser.resetTokenExpiration = undefined;
      return origUser.save();
    })
    .then(() => {
      console.log("Password changed!");
      sendMail(
        "murga@demomailtrap.com",
        origUser.email,
        "Password Changed!",
        "Password changed!",
        `<p>If this wasn't you... too bad :D!</p>`
      );
      return res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
