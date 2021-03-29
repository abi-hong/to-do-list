const express = require("express");
const router = express.Router();
const { List } = require("../models/List");
const { User } = require("../models/User");

// 카테고리 보내주면 all, 취미, 일상, 공부에 따라 userName, userImg, 가장 많은 리스트 보내주기
router.post("/getMain", (req, res) => {
  if (req.body.category === "전체") {
    User.find().exec((err, user) => {
      if (err) return res.status(400).send(err);
      return res.json({ success: true, user });
    });
  } else {
    User.find({ mostList: req.body.category }).exec((err, user) => {
      if (err) return res.status(400).send(err);
      return res.json({ success: true, user });
    });
  }
});

module.exports = router;
