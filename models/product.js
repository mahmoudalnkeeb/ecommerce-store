const format = require('pg-format');
const { pagination } = require('../utils/misc');
module.exports = class Product {
  constructor(pool) {
    this.pool = pool;
  }
  async getProducts(filter, page) {
    let client = await this.pool.connect();
    try {
      let { offset, sql } = pagination(filter, page);
      let res = await client.query(sql, [offset]);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async getProductById(id) {
    let client = await this.pool.connect();
    try {
      let sql = `SELECT
                 product_id,product_name,product_images,product_price,product_desc,product_category,created_at
                 FROM products WHERE product_id = $1 `;
      let res = await client.query(sql, [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async searchProduct(name, category, price) {
    let client = await this.pool.connect();
    try {
      let sql = `SELECT
                 product_id,product_name,product_images,product_price,product_desc,product_category,created_at
                 FROM products
                 WHERE product_name LIKE $1 ORDER BY POSITION($2 in product_name)
                 AND product_category = $3 AND product_price  `;

      let searchName = '%' + name + '%';
      let searchPrice = price
        ? 'IN(' + price.min + ',' + price.max + ')'
        : '= ALL';
      let res = await client.query(sql, [
        searchName,
        name,
        category,
        searchPrice,
      ]);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  // admins only methods

  async addProducts(productsArr) {
    let client = await this.pool.connect();
    try {
      let sql = format(
        'INSERT INTO products(product_id,product_name,product_images,product_price,product_desc,product_category,created_at) VALUES %L',
        productsArr
      );
    } catch (error) {
    } finally {
      client.release();
    }
  }
};
