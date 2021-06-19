const { initDB } = require('../db/init');

const getAllBooks = async () => {
  const query = "select * from ebook join authors on ebook.isbn = authors.isbn";
  const { data, attr } = await initDB(query);

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

const getSearchedBooks = async ({ condition }) => {
  let query = 'select * from ebook join authors on ebook.isbn = authors.isbn';
  const conditionArray = condition.replaceAll(' ', "").split('|');
  const values = [];

  if (condition) {
    query += ' where';
  }

  conditionArray.forEach((cond, index) => {
    const [ option, value1, value2 ] = cond.split(':');
    if (option === '도서명') {
      query += ` ebook.title = :title`;
      values.push(value1);
    } else if (option === '저자명') {
      query += ` authors.author = :author`;
      values.push(value1);
    } else if (option === '출판사') {
      query += ` ebook.publisher = :publisher`;
      values.push(value1);
    } else if (option === '발행년도') {
      query += ` ebook.year between to_date(:startdate, 'yyyy-mm-dd') and to_date(:enddate, 'yyyy-mm-dd')`;
      values.push(`${value1}-01-01`);
      values.push(`${value2}-12-31`);
    }
    if(index < conditionArray.length - 1) {
      query += ' and';
    }
  })

  const { data, attr } = await initDB(query, values);

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

const getRentedBooks = async ({ id }) => {
  const query = "select * from ebook join authors on ebook.isbn = authors.isbn where ebook.cno = :id";
  const { data, attr } = await initDB(query, [ id ]);

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

const getReservedBooks = async ({ id }) => {
  const query = "select * from ebook join authors on ebook.isbn = authors.isbn join reserve on ebook.isbn = reserve.isbn where reserve.cno = :id";
  const { data, attr } = await initDB(query, [ id ]);

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
