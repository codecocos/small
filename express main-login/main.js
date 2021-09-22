const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

//미들웨어 설정
app.use(morgan('dev'));
//cookie-parser : 요청에 동봉된 쿠키를 해석해 req.cookies객체로 만듦.
app.use(cookieParser());
//주소형식으로 데이터 전달, 폼전송에서 많이 사용.
//옵션(extended)이 false인 경우 querystring 모듈 ,true인경우 qs모듈 사용하여 쿼리스트링 해석.
app.use(bodyParser.urlencoded({ extended: false }));



//서버입장시 메인페이지 보여줌
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

/////////////////////////////////////////////////////////////////////////////////////메인페이지에서 작동하는 것

//메인페이지에서 메인 누르면 메인으로 이동
app.get('/index', (req, res) => {
    fs.readFile('index.html', (error, data) => {
        res.send(data.toString());
    });
})

//메인페이지에서 로그인 누르면 로그인페이지로 이동
app.get('/login', (req, res) => {
    fs.readFile('login.html', (error, data) => {
        res.send(data.toString());
    });
})

///////////////////////////////////////////////////////////////////////////////////로그인페이지에서 작동하는 것

//로그인 성공시 보여주기
app.get('/sucess', (req, res) => {
    if (req.cookies.id) {
        res.send('<h1>Welcome!</h1>');
    } else {
        res.redirect('/login');
    }
});

//쿠키생성 : 임시로 아이디와 비번 부여
app.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    console.log(login, password);
    console.log(req.body);

    if (login == 'coco' && password == '1234') {
        res.cookie('id', true);
        res.redirect('/sucess');
    } else {
        res.send("<script>alert('사용자 정보를 다시 확인해주세요~'); location.href='login'</script>");
    }
})

//app.get('/login', (req, res) => { });
//app.post('/login', (req, res) => { });





//서버 열기
app.listen(3001, () => {
    console.log('3001번 포트에서 대기중 입니다.')
})

