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

// 고객 로그인에 관련된 함수
const signinCustomer = async ({ username, password }) => {
  const query = 'select * from customer where name=:username';
  const { data, attr } = await initDB(query, [username]);

  // 계정이 존재하지 않을 경우
  if (!data.length) {
    return { error: '존재하지 않는 계정입니다' };
  }

  const user = {};
  data[0].forEach((d, index) => {
    user[attr[index].name.toLowerCase()] = d;
  });

  // 비밀번호가 없을 경우
  if (user.passwd !== password) {
    return { error: '비밀번호가 일치하지 않습니다' };
  }

  return user;
};

module.exports = {
  signinCustomer,
};
