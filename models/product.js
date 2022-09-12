const format = require('pg-format');
const { productsPagination } = require('../utils/pagination');
class Product {
  constructor(pool) {
    this.pool = pool;
  }

  // products [home page] with pagination
  async getProducts(sortBy = 'recent', page = 1) {
    let client = await this.pool.connect();
    try {
      let { offset, sql } = productsPagination(sortBy, parseInt(page));
      let res = await client.query(sql, [offset]);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // [product page]/ get product by id
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

  // search with filters
  async searchProduct(name, category, price) {
    // not done yet
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

  async getPrice(productId) {
    let client = await this.pool.connect();
    try {
      let sql = 'SELECT product_price FROM products WHERE product_id = $1';
      let res = await client.query(sql, [productId]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // add single product [ONLY ADMINS]
  async addProduct({
    productId,
    productName,
    productPrice,
    productDesc,
    productImages,
    productCategory,
  }) {
    let client = await this.pool.connect();
    try {
      let sql =
        'INSERT INTO products(product_id,product_name,product_images,product_price,product_desc,product_category) VALUES($1 , $2 , $3 , $4 , $5 , $6)';

      let res = await client.query(sql, [
        productId,
        productName,
        productImages,
        productPrice,
        productDesc,
        productCategory,
      ]);
      console.log(res);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // add products from products array of objects [ONLY ADMINS]
  async addProducts(productsArr) {
    let client = await this.pool.connect();
    try {
      let sql = format(
        'INSERT INTO products(product_id,product_name,product_images,product_price,product_desc,product_category) VALUES %L',
        productsArr
      );
      let res = await client.query(sql);
      console.log(res);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // update product
  async updateProduct({
    productId,
    productName,
    productPrice,
    productDesc,
    productImages,
    productCategory,
  }) {
    let client = await this.pool.connect();
    try {
      let sql = `UPDATE products SET 
                    product_id = COALESCE($1, products.product_id),
                    product_name = COALESCE($2, products.product_name),
                    product_price = COALESCE($3, products.product_price),
                    product_desc = COALESCE($4, products.product_desc),
                    product_images = COALESCE($5, products.product_images),
                    product_category = COALESCE($6, products.product_category)
                 WHERE product_id = $1 
                 RETURNING  product_id , product_name , product_price , product_desc , product_images , product_category`;
      let res = await client.query(sql, [
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      ]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  // delete products [ONLY ADMINS]
  async deleteProduct(productId) {
    let client = await this.pool.connect();
    try {
      let sql = 'DELETE FROM product WHERE product_id = $1';
      await client.query(sql, [productId]);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
module.exports = Product;
