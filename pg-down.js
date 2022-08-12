const pool = require('./configs/db');
pool.query(`DROP TABLE IF EXISTS users;`).then(
  (res) => console.log(res),
  (rej) => console.log(rej)
);
