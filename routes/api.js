var express = require("express");
var router = express.Router();
var mu = require("../db/MongoUtils");

/* GET - API of the App. */
router.get("/", function(req, res) {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ error: "You need to be authenticated" });
    }
});

module.exports = router;