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

// 대출되었던 책의 이름과 빌려간 고객의 이름, 대출 날짜, 반납 날짜를 출력
const getStatistic1 = async () => {
  const query = `
  SELECT E.TITLE "도서명", COUNT(*) "대출 수"
  FROM PREVIOUSRENTAL P 
  JOIN EBOOK E ON (P.isbn = E.isbn) 
  JOIN CUSTOMER C ON (P.cno = C.cno)
  GROUP BY E.TITLE
  ORDER BY COUNT(*) DESC`;

  const { data, attr } = await initDB(query);
  
  const result = [];
  data.forEach((item) => {
    const newItem = {}
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    };
    result.push(newItem);
  })

  return result;
};


//대출기록 테이블에서 고객 번호와 해당 고객이 대출한 기록의 갯수와 총 대출 기록 수를 출력
// (단 대출 기록이 많은 고객부터 출력하고, 기록 갯수가 같다면 낮은 번호의 고객부터 출력
// 총 대출 기록의 고객번호는 0번으로 출력하라)
const getStatistic2 = async () => {
  const query = `
    SELECT 
    CASE GROUPING(cno)
        WHEN 1 THEN 0
        ELSE cno
    END AS "고객번호",
    COUNT(*) "대출 권 수"
    FROM PREVIOUSRENTAL P
    GROUP BY CUBE(cno)
    ORDER BY COUNT(*) DESC, cno ASC
  `;

  const { data, attr } = await initDB(query);
  
  const result = [];
  data.forEach((item) => {
    const newItem = {}
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    };
    result.push(newItem);
  })

  return result;
};


// 대출기록 테이블과 고객정보 테이블에서 각 고객의 고객번호, 고객명, 고객의 평균 대여기간을 출력
// (단 평균대여기간이 큰 고객부터 출력한다)
const getStatistic3 = async () => {
  const query = `
  SELECT DISTINCT
    P.cno "고객번호", C.name "고객명",
    AVG(P.datereturned - P.daterented) 
    OVER (PARTITION BY P.cno) AS "평균 대여기간"
  FROM PREVIOUSRENTAL P JOIN CUSTOMER C
  ON P.cno = C.cno
  ORDER BY "평균 대여기간" DESC
  `;

  const { data, attr } = await initDB(query);
  
  const result = [];
  data.forEach((item) => {
    const newItem = {}
    for (let i = 0; i < item.length; i += 1) {
      newItem[attr[i].name.toLowerCase()] = item[i];
    };
    result.push(newItem);
  })

  return result;
};

module.exports = {
  getStatistic1,
  getStatistic2,
  getStatistic3
};
