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

const getReservedBooks = (req, res) => {
  const result = bookService.getReservedBooks();

  return res.status(200).json(result);
};

const rentBook = (req, res) => {
  const result = bookService.rentBook();

  return res.status(200).json(result);
};

const reserveBook = (req, res) => {
  const result = bookService.reserveBook();

  return res.status(200).json(result);
};

const returnRentedBook = (req, res) => {
  const result = bookService.returnRentedBook();

  return res.status(200).json(result);
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
