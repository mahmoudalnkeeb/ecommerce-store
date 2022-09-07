const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../configs/env');
const Hash = require('../utils/bcrypt');
const generateId = require('../utils/id');
const hash = new Hash(bcrypt, SALT_ROUNDS);

class Admin {
  constructor(pool) {
    this.pool = pool;
  }

  async create({ adminFullname, adminUsername, adminPassword, adminEmail }) {
    let client = await this.pool.connect();
    try {
      let sql = `INSERT INTO admins(admin_id , admin_fullname , admin_username , email , hashed_pass , salt )
                 VALUES($1 , $2 , $3 , $4 , $5 , $6)
                 RETURNING admin_id
                `;
      let adminId = generateId();
      let adminSalt = hash.genSalt();
      let hashedPass = hash.createHash(adminPassword, adminSalt);

      let res = await client.query(sql, [
        adminId,
        adminFullname,
        adminUsername,
        adminEmail,
        hashedPass,
        adminSalt,
      ]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async getAdminId(username) {
    let client = await this.pool.connect();
    try {
      let sql = 'SELECT admin_id FROM admins WHERE admin_username = $1';
      let res = await client.query(sql, [username]);
      return res.rows[0].admin_id;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // AUTH METHODS
  async getAccessToken(adminId) {
    let client = await this.pool.connect();
    try {
      let sql = 'SELECT access_token FROM admins WHERE admin_id = $1';
      let res = await client.query(sql, [adminId]);
      return res.rows[0].access_token;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async updateAcessToken(adminId, newAccessToken) {
    let client = await this.pool.connect();
    try {
      let sql =
        'UPDATE admins SET access_token = $1 WHERE admin_id = $2 RETURNING access_token';
      await client.query(sql, [newAccessToken, adminId]);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async checkAdminPass(username, password) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT salt , hashed_pass FROM admins WHERE admin_username = $1';
      let res = await client.query(sql, [username]);
      let data = res.rows[0];
      if (!data) return false;
      let { salt, hashed_pass } = data;
      return hash.compareHash(password, hashed_pass, salt);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Admin;
