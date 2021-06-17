const bookService = require('../service/book');

const getAllBooks = (req, res) => {
  const result = bookService.getAllBooks();

  return res.status(200).json(result);
};

const getSearchedBooks = (req, res) => {
  // req.query
  const result = bookService.getSearchedBooks();

  return res.status(200).json(result);
};

const getRentedBooks = (req, res) => {
  const result = bookService.getRentedBooks();

  return res.status(200).json(result);
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
