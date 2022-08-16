const { SALT_ROUNDS } = require('../configs/env');
const bcrypt = require('bcrypt');
const Hash = require('../utils/bcrypt');
const generateId = require('../utils/id');
const hash = new Hash(bcrypt, SALT_ROUNDS);

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
      let sql = 'SELECT hashed_pass , salt FROM users WHERE username=$1';
      let res = await client.query(sql, [username]);
      let data = res.rows[0];
      if (data) {
        let hashedPass = data.hashed_pass;
        let salt = data.salt;
        if (!hash.compareHash(password, hashedPass, salt)) return false;
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
      let sql = 'SELECT hashed_pass , salt FROM users WHERE email=$1';
      let res = await client.query(sql, [email]);
      let data = res.rows[0];
      if (data) {
        let hashedPass = data.hashed_pass;
        let salt = data.salt;
        if (!hash.compareHash(password, hashedPass, salt)) return false;
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
        'INSERT INTO users(user_id , firstname, lastname, username, email, hashed_pass , salt , avatar) VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8) RETURNING user_id ';
      const salt = hash.genSalt();
      const userId = generateId();
      let hashed_pass = hash.createHash(password, salt);
      let res = await client.query(sql, [
        userId,
        firstname,
        lastname,
        username,
        email,
        hashed_pass,
        salt,
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

  async updateToken(token) {
    const client = await this.pool.connect();
    try {
      let sql = 'UPDATE users SET access_token = $1 RETURNING access_token';
      let res = await client.query(sql, [token]);
      let data = res.rows[0];
      return data.access_token;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async getToken(user_id) {
    const client = await this.pool.connect();
    try {
      let sql = 'SELECT access_token FROM users WHERE user_id=$1';
      let res = await client.query(sql, [user_id]);
      let data = res.rows[0];
      if (data) return data.access_token;
      return false;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
};
