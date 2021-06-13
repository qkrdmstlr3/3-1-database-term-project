const getAllBooks = (req, res) => {
  return res.status(200).json('books');
};

module.exports = {
  getAllBooks,
};
