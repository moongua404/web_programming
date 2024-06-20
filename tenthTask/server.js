const express = require('express')
const app = express()
const port = 3000

//const db = require('node-mysql/lib/db');
//app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/board.html');
})

app.post('/save', function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    let sql = "insert into post (title, content, created) values(?, ?, NOW())";
    let params = [req.body.title, req.body.conetnt];
    /*conn.query(sql, params, function (err, result){
        if (err) throw err;
        console.log('데이터 추가 성공');
    })*/
    
    console.log("저장완료");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})