const { initDB } = require('../db/init');

const signinCustomer = async ({ email, password }) => {
  const { data, attr } = await initDB("select * from customer where email=:email", [email]);

  if (!data.length) {
    return { error: '존재하지 않는 계정입니다' };
  }

  const user = {}
  data[0].forEach((d, index) => {
    user[attr[index].name.toLowerCase()] = d;
  });

  if ( user.passwd !== password ) {
    return { error: '비밀번호가 일치하지 않습니다' };
  }

  return user;
};

module.exports = {
  signinCustomer,
};
