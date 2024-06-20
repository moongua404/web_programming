const express = require('express');
const router = express.Router();
const ObjId = require("mongodb").ObjectId;
const sha = require('sha256');
let session = require("express-session");

router.use(
  session({
    secret: "dkufe8938493j4e08349u",
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/login", function (req, res) {
  console.log(req.session);
  if (req.session.user) {
    console.log("세션 유지");
    res.render("index.ejs", { user: req.session.user });
  } else {
    console.log("로그인 페이지");
    res.render("login.ejs");
  }
});

router.get("/", function (req, res) {
  if (req.session.user) {
    console.log("세션 유지");
    res.render("index.ejs", { user: req.session.user });
  } else {
    console.log("user : null");
    res.render("index.ejs", { user: null });
  }
});

router.post("/login", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log("아이디 : " + req.body.userid);
  console.log("비밀번호 : " + req.body.userpw);
  mydb.collection("account")
    .findOne({ userid: req.body.userid })
    .then((result) => {
      if (result.userpw == sha(req.body.userpw)) {
        req.session.user = req.body;
        console.log("새로운 로그인");
        res.render("index.ejs", { user: req.session.user });
      } else {
        res.render("login.ejs");
      }
    });
});

router.get("/logout", function (req, res) {
  console.log("로그아웃");
  req.session.destroy();
  res.render("index.ejs", { user: null });
});

router.get("/signup", function (req, res) {
  res.render("signup.ejs");
});

router.post("/signup", function (req, res) {
  const mydb = req.app.get('mydb');
  console.log(req.body.userid);
  console.log(sha(req.body.userpw));
  console.log(req.body.usergroup);
  console.log(req.body.useremail);
  mydb.collection("account")
    .insertOne({
      userid: req.body.userid,
      userpw: sha(req.body.userpw),
      usergroup: req.body.usergroup,
      useremail: req.body.useremail,
    })
    .then((result) => {
      console.log("회원가입 성공");
    });
  res.redirect("/");
});

module.exports = router;
