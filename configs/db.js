const { Pool } = require('pg');
const { parse } = require('pg-connection-string');
const { dbUrl } = require('./env');
let { user, password, host, port, database } = parse(dbUrl);
let pool = new Pool({
  user,
  password,
  host,
  port,
  database,
  max: 20,
});

module.exports = pool;
