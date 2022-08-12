const bcrypt = require('bcrypt');

module.exports = class Auth {
  constructor(pool) {
    this.pool = pool;
  }
  async loginWithUsername(username) {
    let sql = 'SELECT firstname , lastname FROM users WHERE username=$1';
    let res = await this.pool.query(sql, [username]);
    let data = res.rows[0];
    return data;
  }
  async loginWithEmail(email) {
    let sql = 'SELECT firstname , lastname FROM users WHERE email=$1';
    let res = await this.pool.query(sql, [email]);
    if (!res.rows.length) return;
    let data = res.rows[0];
    return data.hashed_pass;
  }
  async getPassByUsername(username) {
    let sql = 'SELECT hashed_pass FROM users WHERE username=$1';
    let res = await this.pool.query(sql, [username]);
    if (!res.rows.length) return;
    let data = res.rows[0];
    return data.hashed_pass;
  }
  async getPassByEmail(email) {
    let sql = 'SELECT hashed_pass FROM users WHERE email=$1';
    let res = await this.pool.query(sql, [email]);
    let data = res.rows[0];
    return data.hashed_pass;
  }

  async signup({ firstname, lastname, username, email, password, avatar }) {
    let sql =
      'INSERT INTO users(firstname, lastname, username, email, hashed_pass , avatar) VALUES($1 , $2 , $3 , $4 , $5 , $6) RETURNING firstname , lastname ';
    let res = await this.pool.query(sql, [
      firstname,
      lastname,
      username,
      email,
      password,
      avatar,
    ]);
    let data = res.rows[0];
    return data;
  }
};
