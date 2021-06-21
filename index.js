// Dependencies
const express = require('express');
const path = require('path');
const { initDB } = require('./src/db/init');

// Routes
const bookRouter = require('./src/routes/book');
const customerRouter = require('./src/routes/customer');

const PORT = 3000;

const app = express();

// 초기 실행 시 pub폴더의 index.pug를 화면에 띄워줍니다. 클라이언트의 메인 화면 역할을 합니다.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/pub'));

// api로 받은 body정보를 사용하기 위한 코드
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// css와 js를 사용하기 위한 코드
app.use(express.static(path.join(__dirname, './public/css')));
app.use(express.static(path.join(__dirname, './public/js')));

// 라우팅 설정
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/ebook', bookRouter);
app.use('/customer', customerRouter);

// 정해진 포트에서 서버를 킨다.
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
