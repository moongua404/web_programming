const express = require('express');
const router = express.Router();
const ObjId = require("mongodb").ObjectId;

router.get("/list", function (req, res) {
  const mydb = req.app.get('mydb');
  mydb.collection("post")
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.render("list.ejs", { data: result });
    });
});

router.post("/delete", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  mydb.collection("post")
    .deleteOne(req.body)
    .then((result) => {
      console.log("삭제완료");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

// '/content' 요청에 대한 처리 루틴
router.get("/content/:id", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log(req.params.id);
  req.params.id = new ObjId(req.params.id);
  mydb.collection("post")
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render("content.ejs", { data: result });
    });
});

// '/edit' 요청에 대한 처리 루틴
router.get("/edit/:id", function (req, res) {
  const mydb = req.app.get('mydb');
  req.params.id = new ObjId(req.params.id);
  mydb.collection("post")
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render("edit.ejs", { data: result });
    });
});

router.post("/edit", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log(req.body);
  req.body.id = new ObjId(req.body.id);
  mydb.collection("post")
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: req.body.someDate,
        },
      }
    )
    .then((result) => {
      console.log("수정완료");
      res.redirect("/list");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
