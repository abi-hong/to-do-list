const mongoose = require("mongoose"); // 모듈 가져오기
const Schema = mongoose.Schema;
const { User } = require("../models/User");

const listSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
  },
  todos: [
    new mongoose.Schema(
      {
        id: Number,
        text: String,
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        today: { type: Number, required: true },
        privated: { type: Boolean, default: true },
        checked: { type: Boolean, default: false },
      },
      { _id: false }
    ),
  ],
});

listSchema.statics.saveCategory = function(userId, cb) {
  var list = this;
  var life = 0;
  var study = 0;
  var hobby = 0;
  var most = [];
  list.find(
    {
      writer: userId,
    },
    function (err, lists) {
      if (err) return cb(err);
      for(i = 0; i < lists.length; i++) {
        if(lists[i].category === "일상") {
          for(j = 0; j < lists[i].todos.length; j++) {
            if(lists[i].todos[j].privated === false) life += 1;
          }
        }
        else if(lists[i].category === "공부") {
          for(j = 0; j < lists[i].todos.length; j++) {
            if(lists[i].todos[j].privated === false) study += 1;
          }
        }
        else if(lists[i].category === "취미") {
          for(j = 0; j < lists[i].todos.length; j++) {
            if(lists[i].todos[j].privated === false) hobby += 1;
          }
        }
      }
      if (life >= study && life >= hobby) {
        most.push("일상");
      }
      if (study >= life && study >= hobby) {
        most.push("공부");
      }
      if (hobby >= study && hobby >= life) {
        most.push("취미");
      }
      User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            life: life,
            study: study,
            hobby: hobby,
            mostList: most[0]
          },
        },
        (err, users) => {
          if(err) return cb(err);
          cb(null, users);
        }
      )
    }
  )
};


const List = mongoose.model("List", listSchema); // 스키마와 mongoDB 연결
module.exports = { List };
