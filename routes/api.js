var express = require("express");
var router = express.Router();
var mu = require("../db/MongoUtils");
const axios = require("axios");

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


//Es mas facil utilizar el modulo request para hacer calls a api, ya que estas request pueden variar y dañar alguna petición
router.post("/hasWon", function(req, res) {
    axios
        .get(
            `http://kevinalbs.com/connect4/back-end/index.php/hasWon?board_data=${req.body.board_data}&i=${req.body.i}&j=${req.body.j}`
        )
        .then(function(response) {
            res.send(response.data);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });
});

module.exports = router;
