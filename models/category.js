class Category {
  constructor(pool) {
    this.pool = pool;
  }

  async getCategories() {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT cat_id , cat_name , cat_image , cat_desc FROM categories';
      let res = await client.query(sql);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async getByName(catName) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT cat_id , cat_name , cat_image , cat_desc FROM categories WHERE cat_name = $1';
      let res = await client.query(sql);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // [ONLY ADMINS MODEL'S METHODS]
  async create({ catName, catImage, catDesc }) {
    let client = await this.pool.connect();
    try {
      let sql =
        'INSERT INTO categories(cat_name , cat_image , cat_desc) VALUES($1 , $2 , $3) RETURNING cat_name';
      let res = await client.query(sql, [catName, catImage, catDesc]);
      return res.rows[0]?.cat_name;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async update({ catName, catImage, catDesc, catId }) {
    let client = await this.pool.connect();
    try {
      let sql = `UPDATE categories SET
                    cat_name = COALESCE($1, categories.cat_name),
                    cat_image = COALESCE($1, categories.cat_image),
                    cat_desc = COALESCE($1, categories.cat_desc)
                 WHERE cat_id = $4 RETURNING cat_name , cat_image , cat_desc , cat_id
                `;
      let res = await client.query(sql, [catName, catImage, catDesc, catId]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async delete(cat_id) {
    let client = await this.pool.connect();
    try {
      let sql = 'DELETE FROM categories WHERE cat_id = $1';
      await client.query(sql, [cat_id]);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
module.exports = Category;
