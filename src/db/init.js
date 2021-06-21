/**
 * 파일 설명
 * oracledb와 연동해서 sql문 수행 후 결과를 반환하는 모듈입니다.
 */
const oracledb = require('oracledb');
oracledb.autoCommit = true; // update, insert, delete문을 commit하기 위함

const config = {
  user: 'd201602002',
  password: '0000',
  connectString: '0.0.0.0/xe',
};

function initDB(query, condition = []) {
  return new Promise(function (res, rej) {
    // config정보로 db와 연결
    oracledb.getConnection(config, (err, conn) => {
      try {
        conn.execute(query, condition, function (err, result) {
          if (err) {
            rej(err.message); // 실패 시 에러를 반환
          }
          if (result) {
            // 성공 시 sql로 수행된 결과를 반환, data는 tuple들이, attr은 속성정보가 들어있다
            res({ data: result.rows, attr: result.metaData });
          }
          rej('error');
        });
      } catch (error) {
        rej(error);
      }
    });
  });
}

module.exports = { initDB };
