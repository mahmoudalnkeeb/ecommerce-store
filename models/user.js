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
      let sql = `SELECT user_id , firstname , lastname , username , email , avatar , created_at
                 FROM users WHERE user_id = $1`;
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

      let sqlOld =
        'SELECT firstname , lastname , username , email , avatar FROM users WHERE user_id = $1;';
      let resOld = await client.query(sqlOld, [userId]);

      // alt if not supplied
      let fn = firstname || resOld.rows[0]?.firstname;
      let ln = lastname || resOld.rows[0]?.lastname;
      let un = username || resOld.rows[0]?.username;
      let em = email || resOld.rows[0]?.email;
      let av = avatar || resOld.rows[0]?.avatar;


      let sql = `UPDATE users SET 
                     firstname = $1,
                     lastname = $2,
                     username = $3,
                     email = $4,
                     avatar = $5
                 WHERE user_id = $6 
                 RETURNING firstname , lastname , username , email , avatar`;

      let res = await client.query(sql, [fn, ln, un, em, av, userId]);

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
