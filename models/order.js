class Order {
  constructor(pool) {
    this.pool = pool;
  }

  async owenershipVerfiy(order_id, user_id) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT order_id FROM orders WHERE order_id = $1 AND user_id = $2';
      let res = await client.query(sql, [order_id, user_id]);
      if (res.rows.length === 0) return false;
      return true;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async createOrder({ price, quantity, product_id, user_id }) {
    let client = await this.pool.connect();
    try {
      let sql = `INSERT INTO orders(price , quantity , product_id , user_id)
                 VALUES($1 , $2 , $3 , $4) 
                 RETURNING order_id , price , quantity , product_id , user_id;`;
      let res = await client.query(sql, [price, quantity, product_id, user_id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async getOrderById(order_id) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT order_id , price , quantity , product_id , user_id FROM orders WHERE order_id = $1';
      let res = await client.query(sql, [order_id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async getUserOrders(user_id) {
    let client = await this.pool.connect();
    try {
      let sql =
        'SELECT order_id , price , quantity , product_id , user_id FROM orders WHERE user_id = $1';
      let res = await client.query(sql, [user_id]);
      return res.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async updateOrder(order_id, quantity, price) {
    let client = await this.pool.connect();
    try {
      let sql = `UPDATE orders SET 
                   quantity = $1,
                   price = $2
                   WHERE order_id = $3 
                 RETURNING quantity
                  `;
      let res = await client.query(sql, [quantity, price, order_id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteOrder(order_id) {
    let client = await this.pool.connect();
    try {
      let sql = 'DELETE FROM orders WHERE order_id = $1';
      await client.query(sql, [order_id]);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Order;
