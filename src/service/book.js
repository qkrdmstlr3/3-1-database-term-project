const { initDB } = require('../db/init');

function pad(num) { return ('00'+num).slice(-2) };
function changeDateFormat(date) {
  return  date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
}

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

const rentBook = async ({ bookId, customerId }) => {
  const query1 = "select count(*) from ebook where ebook.cno = :cno"
  const query2 = `update ebook 
    set ebook.cno = :cno, ebook.exttimes = 0, ebook.daterented = to_date(:rentdate, 'yyyymmdd'), ebook.datedue = to_date(:duedate, 'yyyymmdd') 
    where ebook.isbn = :isbn
  `;

  const { data } = await initDB(query1, [ customerId ]);
  if (data[0][0] >= 3) {
    return { error: '대여 권 수를 초과하였습니다'};
  }

  let date = new Date();
  let duedate = new Date();
  if (date.getDay() < 27) {
    date = new Date('2021/06/28');
    duedate = new Date('2021/06/28');
    duedate.setDate(duedate.getDate() + 10);
  }
  date = changeDateFormat(date);
  duedate = changeDateFormat(duedate);

  await initDB(query2, [customerId, date, duedate, bookId]);
  return true;
};

const reserveBook = async ({ customerId, bookId }) => {
  const query1 = ''; // 이미 대여중이라면 에러 반환
  const query = "insert into reserve (isbn, cno, datetime) values (:isbn, :cno, :datetime)";

  let date = new Date();
  if(date.getDay() < 27) {
    date = new Date('2021/06/28');
    // 시간은 지금 시간 사용
  }

  // await initDB(query, [bookId, customerId, date]);
  return '';
};

const returnRentedBook = async ({ bookId }) => {
  const query = "update ebook set ebook.cno = null, ebook.exttimes = null, ebook.daterented = null, ebook.datedue = null where ebook.isbn = :ebookId";
  await initDB(query, [bookId]);

  //TODO: 메일 보내기 기능 추가
  //TODO: previous rental에 기록 추가

  return true;
};

const cancelReservedBook = async ({ customerId, bookId }) => {
  const query = "delete from reserve where cno = :cno and isbn = :isbn";
  await initDB(query, [ customerId, bookId ]);

  return true;
};

const extendExtDateBook = async ({ bookId }) => {
  const query1 = "select exttimes, to_char(datedue) from ebook where ebook.isbn = :isbn";
  const { data } = await initDB(query1, [bookId]);

  const exttimes = parseInt(data[0][0]);
  const datedue = `20${data[0][1]}`;
  if (exttimes >= 2) {
    return { error: '연장 횟수를 초과하셨습니다' };
  }

  let date = new Date(datedue);
  date.setDate(date.getDate() + 10);
  date = changeDateFormat(date);

  const query2 = `update ebook 
    set ebook.exttimes = :times, ebook.datedue = to_date(:datedue, 'yyyymmdd')
    where ebook.isbn = :isbn
  `;

  await initDB(query2, [exttimes + 1, date, bookId]);

  return true;
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
