module.exports = class Dev {
  constructor(pool) {
    this.pool = pool;
  }
  async getUserById(userID) {
    let sql =
      'SELECT user_id , firstname , lastname , email , username , avatar FROM users WHERE user_id=$1';
    let res = await this.pool.query(sql, [userID]);
    let data = res.rows[0];
    return data;
  }
};
