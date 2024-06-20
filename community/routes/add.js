const express = require('express');
const router = express.Router();
const ObjId = require("mongodb").ObjectId;
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, './public/image');
  },
  filename: function (req, file, done) {
    done(null, file.originalname);
  }
});

let upload = multer({ storage: storage });
let imagepath = '';

// '/enter' 요청에 대한 처리 루틴
router.get("/enter", function (req, res) {
  res.render("enter.ejs");
});

// '/save' 요청에 대한 post 방식의 처리 루틴
router.post("/save", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log(req.body.title);
  console.log(req.body.content);
  // 몽고DB에 데이터 저장하기
  mydb.collection("post")
    .insertOne({
      title: req.body.title,
      content: req.body.content,
      date: req.body.someDate,
      path: imagepath
    })
    .then((result) => {
      console.log(result);
      console.log("데이터 추가 성공");
    });

  res.redirect("/list");
});

router.get('/upload', function (req, res) {
  res.render('upload.ejs');
});

router.post('/photo', upload.single('picture'), function (req, res) {
  console.log(req.file.path);
  imagepath = '\\' + req.file.path;
  res.redirect('/upload');
});

module.exports = router;
