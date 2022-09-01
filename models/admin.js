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
      let sql = `INSERT INTO admins(admin_id , admin_fullname , admin_username , admin_email , hashed_pass , salt )
                 VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7)
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
}

module.exports = Admin;
