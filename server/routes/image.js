const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext != ".jpg" || ext != ".png" || ext != "jpeg") {
      return cb(
        res.status(400).end("jpg, png, jpeg만 업로드 가능합니다."),
        false
      );
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("profile");

// 이미지 파일 업로드 후 User database의 image 속성에 저장
router.post("/uploadfiles", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    User.findOneAndUpdate(
      { _id: req.user._id },
      { image: res.req.file.path },
      (err, user) => {
        fs.unlink(`${user.image}`, (err) => {});
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        });
      }
    );
  });
});

module.exports = router;
