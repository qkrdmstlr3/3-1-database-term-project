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

const reserveBook = (req, res) => {
  const result = bookService.reserveBook();

  return res.status(200).json(result);
};

const returnRentedBook = async (req, res) => {
  const { status, result } = await control(bookService.returnRentedBook, req.params);

  return res.status(status).json(result);
};

const cancelReservedBook = (req, res) => {
  const result = bookService.cancelReservedBook();

  return res.status(200).json(result);
};

module.exports = {
  getAllBooks,
  getSearchedBooks,
  getRentedBooks,
  getReservedBooks,
  rentBook,
  reserveBook,
  returnRentedBook,
  cancelReservedBook,
};
