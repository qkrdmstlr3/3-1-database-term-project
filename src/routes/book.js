const express = require('express');
const bookController = require('../controller/book');

const router = express.Router();

// 모든 책
router.get('/all', bookController.getAllBooks);

// 검색된 책
router.get('/search', bookController.getSearchedBooks);

// 해당 고객이 대여한 책
router.get('/rent/customer/:id', bookController.getRentedBooks);

// 해당 고객이 예약된 책
router.get('/reserve/customer/:id', bookController.getReservedBooks);

// 책 대여
router.post('/rent/:bookId/customer/:customerId', bookController.rentBook);

// 책 예약
router.post('/reserve/:bookId/customer/:customerId', bookController.reserveBook);

// 책 반납
router.delete('/rent/:bookId/customer/:customerId', bookController.returnRentedBook);

// 예약 취소
router.delete('/reserve/:bookId/customer/:customerId', bookController.cancelReservedBook);

module.exports = router;
