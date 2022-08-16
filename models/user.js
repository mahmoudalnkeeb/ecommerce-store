const { SALT_ROUNDS } = require('../configs/env');
const bcrypt = require('bcrypt');
const Hash = require('../utils/bcrypt');
const hash = new Hash(bcrypt, SALT_ROUNDS);

module.exports = class User {
  constructor(pool) {
    this.pool = pool;
  }

  async getById(id) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT user_id , firstname , lastname , username , email , avatar FROM users WHERE user_id = $1';
      let res = await client.query(sql, [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async updateUser({ firstname, lastname, username, email, avatar, userId }) {
    let client = await this.pool.connect();
    try {
      let sql = `UPDATE users SET 
                     firstname = COALESCE($1, users.firstname),
                     lastname = COALESCE($2, users.lastname),
                     username = COALESCE($3, users.username),
                     email = COALESCE($4, users.email),
                     avatar = COALESCE($5, users.avatar)
                   WHERE user_id = $6 RETURNING firstname , lastname , username , email , avatar;
                   `;
      let res = await client.query(sql, [
        firstname,
        lastname,
        username,
        email,
        avatar,
        userId,
      ]);

      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async updatePassword(newPass, userId) {
    let client = await this.pool.connect();
    try {
      let sql =
        'UPDATE SET hashed_pass = $1 , salt = $2 WHERE user_id = $3 RETURNING user_id';
      let salt = hash.genSalt();
      let hashed_pass = hash.createHash(newPass, salt);
      let res = await client.query(sql, [hashed_pass, salt, userId]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
};
