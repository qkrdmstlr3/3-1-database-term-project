/**
 * 파일 설명
 * 클라이언트에서 받은 request에서 필요한 정보를 추출해서 service 함수에게 넘겨줍니다.
 * req.query는 querystring의 정보를 req.params는 controller에서 사용하는 :id등의 정보를 가져올 수 있습니다.
 * service함수에서 반환된 값을 적당한 status와 함께 클라이언트로 돌려줍니다.
 */
const bookService = require('../service/book');
const control = require('../utils/controller');

const getAllBooks = async (req, res) => {
  const { status, result } = await control(bookService.getAllBooks);

  return res.status(status).json(result);
};

const getSearchedBooks = async (req, res) => {
  const { status, result } = await control(bookService.getSearchedBooks, req.query);

  return res.status(status).json(result);
};

const getRentedBooks = async (req, res) => {
  const { status, result } = await control(bookService.getRentedBooks, req.params);

  return res.status(status).json(result);
};

const getReservedBooks = async (req, res) => {
  const { status, result } = await control(bookService.getReservedBooks, req.params);

  return res.status(status).json(result);
};

const rentBook = async (req, res) => {
  const { status, result } = await control(bookService.rentBook, req.params);

  return res.status(status).json(result);
};

const reserveBook = async (req, res) => {
  const { status, result } = await control(bookService.reserveBook, req.params);

  return res.status(status).json(result);
};

const returnRentedBook = async (req, res) => {
  const { status, result } = await control(bookService.returnRentedBook, req.params);

  return res.status(status).json(result);
};

const cancelReservedBook = async (req, res) => {
  const { status, result } = await control(bookService.cancelReservedBook, req.params);

  return res.status(status).json(result);
};

const extendExtDateBook = async (req, res) => {
  const { status, result } = await control(bookService.extendExtDateBook, req.params);

  return res.status(status).json(result);
}

module.exports = {
  getAllBooks,
  getSearchedBooks,
  getRentedBooks,
  getReservedBooks,
  rentBook,
  reserveBook,
  returnRentedBook,
  cancelReservedBook,
  extendExtDateBook,
};
