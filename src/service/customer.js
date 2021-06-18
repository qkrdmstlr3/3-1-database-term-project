const { initDB } = require('../db/init');

const signinCustomer = async ({ username, password }) => {
  const { data } = await initDB("select * from customer where name=:username", [username]);
  const result = data[0];
  
  if (!result || !result.length) {
    return { error: '존재하지 않는 계정입니다' };
  }
  if ( result[2] !== password ) {
    return { error: '비밀번호가 일치하지 않습니다' };
  }

  return true;
};

module.exports = {
  signinCustomer,
};
