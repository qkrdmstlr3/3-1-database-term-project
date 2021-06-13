// Dependencies
const express = require('express');
const path = require('path');

// Routes
const bookRouter = require('./src/routes/book');

const PORT = 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/pub'));

app.use(express.static(path.join(__dirname, './public/css')));
app.use(express.static(path.join(__dirname, './public/js')));

app.use('/book', bookRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
