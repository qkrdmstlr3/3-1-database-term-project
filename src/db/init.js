const oracledb = require('oracledb');
const config = {
  user: 'd201602002',
  password: '0000',
  connectString: '0.0.0.0/xe'
}

function initDB(query, condition = []) {
  return new Promise(function(res, rej) {
    oracledb.getConnection(config, (err, conn) => {
      try {
        conn.execute(query, condition, function (err, result) {
          if (err) {
              rej(err.message);
          }
          res({ data: result.rows, attr: result.metaData }); 
        });
      } catch(error) {
        rej(error);
      }
    });
  });
}

module.exports = { initDB }
