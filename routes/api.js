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

router.get("/top10", function(req, res) {
    mu.topTen().then((topTen) => res.json(topTen));
});

router.put("/update", function(req, res) {
    mu.updateUser(req.user._id, req.body).then(
        res.json({ error: "Update succesfully" })
    );
});

module.exports = router;