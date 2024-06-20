require('dotenv').config();

const express = require("express");
const app = express();
const mongoclient = require("mongodb").MongoClient;

const url = "mongodb+srv://user1:hQ3IEumucTK0JKrh@webprogrammingdatabase.psny997.mongodb.net/?retryWrites=true&w=majority&appName=WebprogrammingDatabase";

mongoclient
  .connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
  })
  .then((client) => {
    const mydb = client.db("myboard");
    app.set("mydb", mydb);

    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// 정적 파일 라이브러리 추가
app.use("/public", express.static("public"));

// 라우트 설정
app.use('/', require('./routes/post'));
app.use('/', require('./routes/add'));
app.use('/', require('./routes/auth'));

// 예제 엔드포인트
app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});

let cookieParser = require("cookie-parser");
app.use(cookieParser("ncvka0e398423kpfd"));

app.get("/cookie", function (req, res) {
  let milk = parseInt(req.signedCookies.milk) + 1000;
  if (isNaN(milk)) {
    milk = 0;
  }
  res.cookie("milk", milk, { signed: true });
  res.send("product : " + milk + "원");
});

app.get('/search', function(req, res){
  const mydb = req.app.get('mydb');
  console.log(req.query);
  mydb.collection("post")
    .find({ title: req.query.value }).toArray()
    .then((result) => {
      console.log(result);
      res.render("sresult.ejs", { data: result });
    });
});

module.exports = app;
