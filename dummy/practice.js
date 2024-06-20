const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('프로그래밍 언어 이름을 입력하시오. : ', function(n){
    n %- 2;
    console.log("에렐렐렐레");
    console.log(n);
});