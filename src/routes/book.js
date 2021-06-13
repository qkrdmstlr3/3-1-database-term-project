const express = require('express');
const { getAllBooks } = require('../controller/book');

const router = express.Router();

router.get('/all', getAllBooks);

module.exports = router;
