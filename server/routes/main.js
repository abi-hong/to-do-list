const express = require('express');
const router = express.Router();
const { List } = require("../models/List");
const { User } = require("../models/User");

//전체 각 category마다 지금까지 쓴 게 가장 많은 걸 나타내도록

router.post("/mainPage", (req, res) => {
    if(req.body.category === "전체") {
        User.find().exec((err, user) => {
            if(err) return res.status(400).send(err);
            return res.json({ success: true, user });
        });
    }
    else {
        User.find({ mostList: req.body.category }).exec((err, user) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, user });
        })
    }
});

module.exports = router;