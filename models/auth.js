const bcrypt = require('bcrypt');

module.exports = class Auth {
  constructor(pool) {
    this.pool = pool;
  }
  async loginWithUsername(username) {
    let sql = 'SELECT user_id FROM users WHERE username=$1';
    let res = await this.pool.query(sql, [username]);
    let data = res.rows[0];
    return data;
  }
  async loginWithEmail(email) {
    let sql = 'SELECT user_id FROM users WHERE email=$1';
    let res = await this.pool.query(sql, [email]);
    let data = res.rows[0];
    return data;
  }
  async getPassByUsername(username) {
    console.log({ username });
    let sql = 'SELECT hashed_pass FROM users WHERE username=$1';
    let res = await this.pool.query(sql, [username]);
    let data = res.rows[0];
    if (data) return data.hashed_pass;
    return false;
  }
  async getPassByEmail(email) {
    console.log({ email });
    let sql = 'SELECT hashed_pass FROM users WHERE email=$1';
    let res = await this.pool.query(sql, [email]);
    let data = res.rows[0];
    if (data) return data.hashed_pass;
    return false;
  }

  async signup({ firstname, lastname, username, email, password, avatar }) {
    let sql =
      'INSERT INTO users(firstname, lastname, username, email, hashed_pass , avatar) VALUES($1 , $2 , $3 , $4 , $5 , $6) RETURNING user_id ';
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
