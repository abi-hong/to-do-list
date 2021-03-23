const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// list 저장 router
// client에서 post 요청할 때 writer 정보(User)를 함께 보내줘야 함
router.post("/saveList", (req, res) => {
  const list = new List(req.body);
  List.deleteOne(
    { writer: req.body.writer, category: req.body.category },
    (err, res) => { }
  );
  List.findOneAndUpdate(
    { writer: req.body.writer, category: req.body.category },
    { $push: { todos: req.body.todos } },
    (err, info) => {
      if (!info) {
        list.save((err, listInfo) => {
          if (err) return res.json({ success: false, err });
        });
        return res.json({ success: true, list });
      }
      return res.status(200).json({ success: true, list });
    }
  );
});

// list를 database에서 불러와 client에게 전달
router.post("/getList", (req, res) => {
  // client에서 writer, category, date 정보 전달해줘야 함
  List.findOne(
    {
      writer: req.body.writer,
      category: req.body.category,
      "todos.year": req.body.year,
      "todos.month": req.body.month,
      "todos.today": req.body.today,
    }
    //{ "todos.$": 1 }
  ).exec((err, list) => {
    if (err) return res.status(400).send(err);
    if (!list) return res.json({ success: true, list });
    for (i = list.todos.length - 1; i >= 0; i--) {
      if (
        list.todos[i].year !== req.body.year ||
        list.todos[i].month !== req.body.month ||
        list.todos[i].today !== req.body.today
      ) {
        list.todos.splice(i, 1);
      }
    }
    return res.status(200).json({
      success: true,
      listCount: list.todos.length,
      list,
    });
    // listCount는 writer, category, date로 찾은 todos 안의 배열 개수
  });
});

// 달성률 route
router.post("/getSuccess", (req, res) => {
  let todayTotal = 0;
  let todayDone = 0;
  let monthTotal = 0;
  let monthDone = 0;
  List.find({
    writer: req.body.writer,
    todos: {
      $elemMatch: {
        year: req.body.year,
        month: req.body.month,
      },
    },
  })
    .exec()
    .then((list) => {
      for (i = 0; i < list.length; i++) {
        for (j = 0; j < list[i].todos.length; j++) {
          if (
            list[i].todos[j].year === req.body.year &&
            list[i].todos[j].month === req.body.month
          ) {
            monthTotal += 1;
            if (list[i].todos[j].checked === true) monthDone += 1;
            if (list[i].todos[j].today === req.body.today) {
              todayTotal += 1;
              if (list[i].todos[j].checked === true) todayDone += 1;
            }
          }
        }
      }
      return res.status(200).json({
        success: true,
        todayTotal,
        todayDone,
        monthTotal,
        monthDone,
        //list,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
