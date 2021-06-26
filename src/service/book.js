/**
 * 파일 설명
 * controller에서 받은 정보와 query문을 이용해서 DB관련 로직을 수행합니다.
 * 가져온 정보를 가공하거나 확인해서 올바르지 않다면 에러를 반환해주고 올바르다면 필요한 정보를 돌려줍니다.
 *
 * query수행결과 조회된 tuple은 data에, 테이블의 속성은 attr에 담겨서 돌아옵니다.
 * initDB호출 시 두 가지 매개변수를 넘겨줄 수 있습니다. 첫 번째 인자는 query문이며 두 번째는 query문에 필요한 데이터들입니다.
 * query문의 ':data'로 표시된 부분이 두 번째 인자의 배열의 원소들에게 각각 대응됩니다.
 */
const { initDB } = require('../db/init');
const nodemailer = require('nodemailer');
const config = require('../config');

// 들어온 값에 padding 0을 붙여서 두자리로 반환해준다.
function pad(num) { return ('00'+num).slice(-2) };
// db에 적합한 데이터 포맷인 yyyymmdd로 바꾸어준다.
function changeDateFormat(date) {
  return  date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
}

// 모든 책을 가져오는 함수
const getAllBooks = async () => {
  const query = "select * from ebook join authors on ebook.isbn = authors.isbn";
  const { data, attr } = await initDB(query);

  // data와 attr을 조합해서 객체들을 만들고 여러명의 저자가 있는 경우를 처리한다.
  // 아래도 같은 로직이 몇 번 나온다
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

// 검색한 책들을 가져오는 함수
const getSearchedBooks = async ({ condition }) => {
  let query = 'select * from ebook join authors on ebook.isbn = authors.isbn';
  const conditionArray = condition.replaceAll(' ', "").split('|');
  const values = [];

  if (condition) {
    query += ' where';
  }

  // 여러 조건들을 query문으로 만드는 작업이다.
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

  // db에서 받아온 정보
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

// 대여한 책들 정보를 고객 id를 이용해서 가져온다.
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

// 예약한 책들 정보를 고객 id를 이용해서 가져온다.
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

// 고객이 책을 대여한다
const rentBook = async ({ bookId, customerId }) => {
  const query1 = "select count(*) from ebook where ebook.cno = :cno"
  const query2 = `update ebook 
    set ebook.cno = :cno, ebook.exttimes = 0, ebook.daterented = to_date(:rentdate, 'yyyymmdd'), ebook.datedue = to_date(:duedate, 'yyyymmdd') 
    where ebook.isbn = :isbn
  `;

  // 최대 대여 개수를 초과했는지 확인
  const { data } = await initDB(query1, [ customerId ]);
  if (data[0][0] >= 3) {
    return { error: '대여 권 수를 초과하였습니다'};
  }

  let date = new Date();
  let duedate = new Date();
  duedate.setDate(duedate.getDate() + 10);
  date = changeDateFormat(date);
  duedate = changeDateFormat(duedate);

  await initDB(query2, [customerId, date, duedate, bookId]);
  return true;
};

// 고객이 책을 예약한다.
const reserveBook = async ({ customerId, bookId }) => {
  const query0 = "select count(*) from ebook where ebook.isbn = :isbn and ebook.cno = :cno";
  const query1 = "select isbn from reserve where reserve.cno = :cno";
  const query2 = "insert into reserve (isbn, cno, datetime) values (:isbn, :cno, to_date(:now, 'YYYYMMDDHH24MISS'))";

  // 현재 대여중인 도서인지 파악
  const { data: query0result } = await initDB(query0, [ bookId, customerId ]);
  if (query0result[0][0] > 0) {
    return { error: '대여하시고 있는 도서입니다'};
  }

  // 최대 예약 개수를 초과했는지 확인
  const { data: query1result } = await initDB(query1, [ customerId ]);
  if (query1result.length >= 3) {
    return { error: '예약 권 수를 초과하여 예약할 수 없습니다' };
  }
  for (let i = 0; i < query1result.length; i += 1) {
    if (query1result[i][0] === parseInt(bookId)) {
      return { error: '이미 예약하신 도서입니다' };
    }
  }

  let date = new Date();
  const now = new Date();
  date = changeDateFormat(date);
  date = `${date}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  await initDB(query2, [bookId, customerId, date]);
  return true;
};

// 빌린 책 반납
const returnRentedBook = async ({ customerId, bookId, daterented }) => {
  const query0 = "update ebook set ebook.cno = :cno, ebook.exttimes = 0, ebook.daterented = :daterented, ebook.datedue = :datedue where ebook.isbn = :ebookId" // 예약한 사람이 있는 경우
  const query1 = "update ebook set ebook.cno = null, ebook.exttimes = null, ebook.daterented = null, ebook.datedue = null where ebook.isbn = :ebookId"; // 예약한 사람이 없는 경우
  const query2 = "insert into previousrental (isbn, cno, daterented, datereturned) values (:isbn, :cno, :daterented, :datereturned)";
  const query3 = "select cno from reserve where reserve.isbn = :isbn order by reserve.datetime";
  const query4 = "delete from reserve where reserve.isbn = :isbn and cno = :cno";
  const query5 = "select email, name from customer where cno = :cno"

  //previous rental에 기록 추가
  let today = new Date()
  today = changeDateFormat(today)
  let rentedDate = new Date(daterented)
  rentedDate = changeDateFormat(rentedDate)
  await initDB(query2, [bookId, customerId, rentedDate, today])

  //예약한 사람이 있다면 reserve테이블에서 기록 삭제, 메일 보내기 기능 추가
  const { data } = await initDB(query3, [bookId]);
  if (data[0]) {
    const cno = data[0][0];

    await initDB(query4, [bookId, cno])
    const { data: reservedUser } = await initDB(query5, [cno]);
    const email = reservedUser[0][0];
    const name = reservedUser[0][1];

    const transporter = nodemailer.createTransport({
      // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
      service: 'gmail',
      // host를 gmail로 설정
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        // Gmail 주소 입력, 'testmail@gmail.com'
        user: config.mail,
        // Gmail 패스워드 입력
        pass: config.password,
      },
    });

    await transporter.sendMail({
      // 보내는 곳의 이름과, 메일 주소를 입력
      from: `"Library"`,
      // 받는 곳의 메일 주소를 입력
      to: email,
      // 보내는 메일의 제목을 입력
      subject: '예약 도서 대여됨',
      // 보내는 메일의 내용을 입력
      // text: 일반 text로 작성된 내용
      // html: html로 작성된 내용
      text: `${name}님이 예약한 도서가 대여되었습니다`,
    });

    let duedate = new Date();
    duedate.setDate(duedate.getDate() + 10);
    duedate = changeDateFormat(duedate);
    await initDB(query0, [cno, rentedDate, duedate, bookId]);
  } else {
    await initDB(query1, [bookId]); // 대출 도서에서 빌린 정보 없애기
  }

  return true;
};

// 예약한 책 취소
const cancelReservedBook = async ({ customerId, bookId }) => {
  const query = "delete from reserve where cno = :cno and isbn = :isbn";
  await initDB(query, [ customerId, bookId ]);

  return true;
};

// 기한 연장
const extendExtDateBook = async ({ bookId }) => {
  const query0 = "select count(*) from reserve where reserve.isbn = :isbn";
  const query1 = "select exttimes, to_char(datedue) from ebook where ebook.isbn = :isbn";

  const { data: reservedCount } = await initDB(query0, [bookId]);
  if (reservedCount[0][0] > 0) {
    return { error: '다른 사람에 의해 예약된 책은 연장할 수 없습니다' };
  }

  const { data } = await initDB(query1, [bookId]);

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
