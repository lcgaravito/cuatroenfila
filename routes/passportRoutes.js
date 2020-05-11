const express = require("express");
const passport = require("passport");
var mu = require("../db/MongoUtils");

var router = express.Router();

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/signup", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    victories: 0,
    defeats: 0,
    tie: 0,
  };
  mu.createUser(user).then(res.json({ message: "User Saved" }));
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

module.exports = router;
