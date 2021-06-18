const { initDB } = require('../db/init');

const getAllBooks = async () => {
  const {data, attr} = await initDB("select * from ebook join authors on ebook.isbn = authors.isbn");

  const result = [];
  data.forEach((item) => {
    const newItem = {}
    for(let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    };
    newItem.author = [ newItem.author ];
    if(result.length && newItem.isbn === result[result.length - 1].isbn) {
      result[result.length - 1].author.push(newItem.author[0]);
      return;
    }
    result.push(newItem);
  });
  
  return result;
};

const getSearchedBooks = () => {
  return '';
};

const getRentedBooks = () => {
  return '';
};

const getReservedBooks = () => {
  return '';
};

const rentBook = () => {
  return '';
};

const reserveBook = () => {
  return '';
};

const returnRentedBook = () => {
  return '';
};

const cancelReservedBook = () => {
  return '';
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
