const express = require("express");
const passport = require("passport");
var mu = require("../db/MongoUtils");

var router = express.Router();

router.post("/login", function(req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function(err, user) {
        console.log(user);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ authenticated: false });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.json({ authenticated: true, user });
        });
    })(req, res, next);
});

router.post("/signup", async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        victories: 0,
        defeats: 0,
        tie: 0,
    };
    mu.createUser(user).then(res.json({ message: "User Saved" }));
});

router.get("/logout", function(req, res) {
    req.logout();
    res.json({ ok: true });
});

router.get("/getUser", (req, res) => {
    return res.json(req.user || null);
});

router.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn(),
    function(req, res) {
        res.json({ user: req.user });
    }
);

module.exports = router;