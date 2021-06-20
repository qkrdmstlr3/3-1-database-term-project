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
