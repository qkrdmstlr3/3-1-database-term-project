const express = require('express');
const path = require('path');

const PORT = 3000

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/pub'));

app.use(express.static(path.join(__dirname, './public/css')));
app.use(express.static(path.join(__dirname, './public/js')));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(PORT, () => 
  console.log(`Server is running on ${PORT}`)
);