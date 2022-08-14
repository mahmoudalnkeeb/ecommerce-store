const { saltRounds } = require('../configs/env');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+saltRounds);
const Hash = require('../utils/bcrypt');
const hash = new Hash(bcrypt, saltRounds, salt);

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

  async checkPassByUsername(username, password) {
    let sql = 'SELECT hashed_pass FROM users WHERE username=$1';
    let res = await this.pool.query(sql, [username]);
    let data = res.rows[0];
    if (data) {
      let hashedPass = data.hashed_pass;
      if (!hash.compareHash(password, hashedPass)) return false;
      return true;
    }
    return false;
  }

  async checkPassByEmail(email, password) {
    let sql = 'SELECT hashed_pass FROM users WHERE email=$1';
    let res = await this.pool.query(sql, [email]);
    let data = res.rows[0];
    if (data) {
      let hashedPass = data.hashed_pass;
      if (!hash.compareHash(password, hashedPass)) return false;
      return true;
    }
    return false;
  }

  async signup({ firstname, lastname, username, email, password, avatar }) {
    let sql =
      'INSERT INTO users(firstname, lastname, username, email, hashed_pass , avatar) VALUES($1 , $2 , $3 , $4 , $5 , $6) RETURNING user_id ';
    let hashed_pass = hash.createHash(password);
    let res = await this.pool.query(sql, [
      firstname,
      lastname,
      username,
      email,
      hashed_pass,
      avatar,
    ]);
    let data = res.rows[0];
    return data;
  }
};
