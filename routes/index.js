var express = require("express");
var router = express.Router();
var mu = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

module.exports = router;
