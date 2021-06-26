// Dependencies
const express = require('express');
const path = require('path');
const { initDB } = require('./src/db/init');

// Routes
const bookRouter = require('./src/routes/book');
const customerRouter = require('./src/routes/customer');
const statisticRouter = require('./src/routes/statistic');

const PORT = 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/pub'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/css')));
app.use(express.static(path.join(__dirname, './public/js')));

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/ebook', bookRouter);
app.use('/customer', customerRouter);
app.use('/statistic', statisticRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  // initDB();
});
