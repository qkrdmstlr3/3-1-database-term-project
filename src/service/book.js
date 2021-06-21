/**
 * 파일 설명
 * controller에서 받은 정보와 query문을 이용해서 DB관련 로직을 수행합니다.
 * 가져온 정보를 가공하거나 확인해서 올바르지 않다면 에러를 반환해주고 올바르다면 필요한 정보를 돌려줍니다.
 *
 * query수행결과 조회된 tuple은 data에, 테이블의 속성은 attr에 담겨서 돌아옵니다.
 * initDB호출 시 두 가지 매개변수를 넘겨줄 수 있습니다. 첫 번째 인자는 query문이며 두 번째는 query문에 필요한 데이터들입니다.
 * query문의 ':data'로 표시된 부분이 두 번째 인자의 배열의 원소들에게 각각 대응됩니다.
 *
 * 모든 날짜의 기준은 6월 28일에 맞추어져 있습니다.
 */
const { initDB } = require('../db/init');

// 들어온 값에 padding 0을 붙여서 두자리로 반환해준다.
function pad(num) {
  return ('00' + num).slice(-2);
}
// db에 적합한 데이터 포맷인 yyyymmdd로 바꾸어준다.
function changeDateFormat(date) {
  return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
}

// 모든 책을 가져오는 함수
const getAllBooks = async () => {
  const query = 'select * from ebook join authors on ebook.isbn = authors.isbn';
  const { data, attr } = await initDB(query);

  // data와 attr을 조합해서 객체들을 만들고 여러명의 저자가 있는 경우를 처리한다.
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    }
    newItem.author = [newItem.author];
    if (result.length && newItem.isbn === result[result.length - 1].isbn) {
      result[result.length - 1].author.push(newItem.author[0]);
      return;
    }
    result.push(newItem);
  });

  return result;
};

// 검색한 책들을 가져오는 함수
const getSearchedBooks = async ({ condition }) => {
  let query = 'select * from ebook join authors on ebook.isbn = authors.isbn';
  const conditionArray = condition.replaceAll(' ', '').split('|');
  const values = [];

  if (condition) {
    query += ' where';
  }

  // 여러 조건들을 query문으로 만드는 작업이다.
  conditionArray.forEach((cond, index) => {
    const [option, value1, value2] = cond.split(':');
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
    if (index < conditionArray.length - 1) {
      query += ' and';
    }
  });

  // db에서 받아온 정보
  const { data, attr } = await initDB(query, values);

  // data와 attr을 조합해서 객체들을 만들고 여러명의 저자가 있는 경우를 처리한다.
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    }
    newItem.author = [newItem.author];
    if (result.length && newItem.isbn === result[result.length - 1].isbn) {
      result[result.length - 1].author.push(newItem.author[0]);
      return;
    }
    result.push(newItem);
  });

  return result;
};

// 대여한 책들 정보를 고객 id를 이용해서 가져온다.
const getRentedBooks = async ({ id }) => {
  const query =
    'select * from ebook join authors on ebook.isbn = authors.isbn where ebook.cno = :id';
  const { data, attr } = await initDB(query, [id]);

  // data와 attr을 조합해서 객체들을 만들고 여러명의 저자가 있는 경우를 처리한다.
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    }
    newItem.author = [newItem.author];
    if (result.length && newItem.isbn === result[result.length - 1].isbn) {
      result[result.length - 1].author.push(newItem.author[0]);
      return;
    }
    result.push(newItem);
  });

  return result;
};

// 예약한 책들 정보를 고객 id를 이용해서 가져온다.
const getReservedBooks = async ({ id }) => {
  const query =
    'select * from ebook join authors on ebook.isbn = authors.isbn join reserve on ebook.isbn = reserve.isbn where reserve.cno = :id';
  const { data, attr } = await initDB(query, [id]);

  // data와 attr을 조합해서 객체들을 만들고 여러명의 저자가 있는 경우를 처리한다.
  const result = [];
  data.forEach((item) => {
    const newItem = {};
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    }
    newItem.author = [newItem.author];
    if (result.length && newItem.isbn === result[result.length - 1].isbn) {
      result[result.length - 1].author.push(newItem.author[0]);
      return;
    }
    result.push(newItem);
  });

  return result;
};

// 고객이 책을 대여한다
const rentBook = async ({ bookId, customerId }) => {
  const query1 = 'select count(*) from ebook where ebook.cno = :cno';
  const query2 = `update ebook 
    set ebook.cno = :cno, ebook.exttimes = 0, ebook.daterented = to_date(:rentdate, 'yyyymmdd'), ebook.datedue = to_date(:duedate, 'yyyymmdd') 
    where ebook.isbn = :isbn
  `;

  // 최대 대여 개수를 초과했는지 확인
  const { data } = await initDB(query1, [customerId]);
  if (data[0][0] >= 3) {
    return { error: '대여 권 수를 초과하였습니다' };
  }

  let date = new Date('2021/06/28');
  let duedate = new Date('2021/06/28');
  duedate.setDate(duedate.getDate() + 10);
  date = changeDateFormat(date);
  duedate = changeDateFormat(duedate);

  // 6월 28일 날짜로 책을 대여한다.
  await initDB(query2, [customerId, date, duedate, bookId]);
  return true;
};

// 고객이 책을 예약한다.
const reserveBook = async ({ customerId, bookId }) => {
  const query0 = 'select count(*) from ebook where ebook.isbn = :isbn and ebook.cno = :cno';
  const query1 = 'select isbn from reserve where reserve.cno = :cno';
  const query2 =
    "insert into reserve (isbn, cno, datetime) values (:isbn, :cno, to_date(:now, 'YYYYMMDDHH24MISS'))";

  // 현재 대여중인 도서인지 파악
  const { data: query0result } = await initDB(query0, [bookId, customerId]);
  if (query0result[0][0] > 0) {
    return { error: '대여하시고 있는 도서입니다' };
  }

  // 최대 예약 개수를 초과했는지 확인
  const { data: query1result } = await initDB(query1, [customerId]);
  if (query1result.length >= 3) {
    return { error: '예약 권 수를 초과하여 예약할 수 없습니다' };
  }
  for (let i = 0; i < query1result.length; i += 1) {
    if (query1result[i][0] === parseInt(bookId)) {
      return { error: '이미 예약하신 도서입니다' };
    }
  }

  // 6월 28일 날짜로 책을 예약
  let date = new Date('2021/06/28');
  const now = new Date();
  date = changeDateFormat(date);
  date = `${date}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  await initDB(query2, [bookId, customerId, date]);
  return true;
};

// 빌린 책 반납
const returnRentedBook = async ({ bookId }) => {
  const query =
    'update ebook set ebook.cno = null, ebook.exttimes = null, ebook.daterented = null, ebook.datedue = null where ebook.isbn = :ebookId';
  await initDB(query, [bookId]); // 반납하기

  //TODO: 메일 보내기 기능 추가
  //TODO: previous rental에 기록 추가

  return true;
};

// 예약한 책 취소
const cancelReservedBook = async ({ customerId, bookId }) => {
  const query = 'delete from reserve where cno = :cno and isbn = :isbn';
  await initDB(query, [customerId, bookId]); // 취소하기

  return true;
};

// 기한 연장
const extendExtDateBook = async ({ bookId }) => {
  //TODO: 예약되어있다면 연장 불가
  const query1 = 'select exttimes, to_char(datedue) from ebook where ebook.isbn = :isbn';
  const { data } = await initDB(query1, [bookId]);

  // 최대 연장 횟수 초과했는지 확인
  const exttimes = parseInt(data[0][0]);
  const datedue = `20${data[0][1]}`;
  if (exttimes >= 2) {
    return { error: '연장 횟수를 초과하셨습니다' };
  }

  // 기존 만기일에서 10일 추가
  let date = new Date(datedue);
  date.setDate(date.getDate() + 10);
  date = changeDateFormat(date);

  const query2 = `update ebook 
    set ebook.exttimes = :times, ebook.datedue = to_date(:datedue, 'yyyymmdd')
    where ebook.isbn = :isbn
  `;

  // 연장하기
  await initDB(query2, [exttimes + 1, date, bookId]);

  return true;
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
  extendExtDateBook,
};
