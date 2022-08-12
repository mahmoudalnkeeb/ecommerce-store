const pool = require('./configs/db');
pool
  .query(
    `CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(200) NOT NULL,
    lastname VARCHAR(200),
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE,
    hashed_pass VARCHAR NOT NULL,
    avatar VARCHAR NOT NULL
);`
  )
  .then(
    (res) => console.log(res),
    (rej) => console.log(rej)
  );
