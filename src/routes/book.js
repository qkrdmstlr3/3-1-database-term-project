/**
 * 파일 설명
 * 책들과 관련된 api들을 받습니다.
 * 첫 번째 인자로 받은 url을, 두 번째 인자로는 controller의 함수를 넘겨줍니다.
 * :id처럼 처리된 부분은 클라이언트에서 보내는 것을 param으로 받을 수 있습니다.
 */
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
router.delete('/rent/:bookId/customer/:customerId/date/:daterented', bookController.returnRentedBook);

// 예약 취소
router.delete('/reserve/:bookId/customer/:customerId', bookController.cancelReservedBook);

// 대여 기간 연장
router.put('/extend/:bookId', bookController.extendExtDateBook);

module.exports = router;
