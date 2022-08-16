const { Pool } = require('pg');
const { parse } = require('pg-connection-string');
const { DB_URL } = require('./env');
let { user, password, host, port, database } = parse(DB_URL);
let pool = new Pool({
  user,
  password,
  host,
  port,
  database,
  max: 80,
});
module.exports = pool;
