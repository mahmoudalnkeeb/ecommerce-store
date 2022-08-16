const format = require('pg-format')
module.exports = class Category {
  constructor(pool) {
    this.pool = pool;
  }
  async create(categoriesArr){
    const client = this.pool.connect()
    try {
        let sql = 'INSERT INTO categories(cat_id , cat_name , cat)'
    } catch (error) {
        
    }finally{

    }
  }
};
