const { SALT_ROUNDS } = require('../configs/env');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+SALT_ROUNDS);
const Hash = require('../utils/bcrypt');
const hash = new Hash(bcrypt, SALT_ROUNDS, salt);

module.exports = class Auth {
  constructor(pool) {
    this.pool = pool;
  }

  async loginWithUsername(username) {
    const client = await this.pool.connect();
    try {
      let sql = 'SELECT user_id FROM users WHERE username=$1';
      let res = await client.query(sql, [username]);
      let data = res.rows[0];
      return data;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async loginWithEmail(email) {
    const client = await this.pool.connect();
    try {
      let sql = 'SELECT user_id FROM users WHERE email=$1';
      let res = await client.query(sql, [email]);
      let data = res.rows[0];
      return data;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async checkPassByUsername(username, password) {
    const client = await this.pool.connect();
    try {
      let sql = 'SELECT hashed_pass FROM users WHERE username=$1';
      let res = await client.query(sql, [username]);
      let data = res.rows[0];
      if (data) {
        let hashedPass = data.hashed_pass;
        if (!hash.compareHash(password, hashedPass)) return false;
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async checkPassByEmail(email, password) {
    const client = await this.pool.connect();
    try {
      let sql = 'SELECT hashed_pass FROM users WHERE email=$1';
      let res = await client.query(sql, [email]);
      let data = res.rows[0];
      if (data) {
        let hashedPass = data.hashed_pass;
        if (!hash.compareHash(password, hashedPass)) return false;
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async signup({ firstname, lastname, username, email, password, avatar }) {
    const client = await this.pool.connect();
    try {
      let sql =
        'INSERT INTO users(firstname, lastname, username, email, hashed_pass , avatar) VALUES($1 , $2 , $3 , $4 , $5 , $6) RETURNING user_id ';
      let hashed_pass = hash.createHash(password);
      let res = await client.query(sql, [
        firstname,
        lastname,
        username,
        email,
        hashed_pass,
        avatar,
      ]);
      let data = res.rows[0];
      return data;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
};
