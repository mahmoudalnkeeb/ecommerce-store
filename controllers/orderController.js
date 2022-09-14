const pool = require('../configs/db');
const Order = require('../models/order');
const Product = require('../models/product');
const products = new Product(pool);
const orders = new Order(pool);

/* todo
    create order
    get order by id
    get user orders
    update order
    delete order
*/

class OrderController {
  async getTotalPrice(req, res, next) {
    try {
      let user_id = req.userId;
      let totalPrice = await orders.getTotalPrice(user_id);
      res.status(200).json(totalPrice);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      let { quantity, product_id } = req.body;
      let user_id = req.userId;
      let price = (await products.getPrice(product_id)) * quantity;
      let order = await orders.createOrder({
        price,
        quantity,
        product_id,
        user_id,
      });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      let order_id = req.params.id;
      let user_id = req.userId;
      let checkIsOwned = await orders.owenershipVerfiy(order_id, user_id);
      if (!checkIsOwned) return res.status(403).send('Forbidden');
      let order = await orders.getOrderById(order_id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      let user_id = req.userId;
      let userOrders = await orders.getUserOrders(user_id);
      res.status(200).json({ userOrders });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      let { order_id, quantity } = req.body;
      let user_id = req.userId;
      let price = (await products.getPrice(product_id)) * quantity;
      let checkIsOwned = await orders.owenershipVerfiy(order_id, user_id);
      if (!checkIsOwned) return res.status(403).send('Forbidden');
      let updatedOrder = await orders.updateOrder(order_id, quantity, price);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      let { order_id } = req.body;
      let user_id = req.userId;
      let checkIsOwned = await orders.owenershipVerfiy(order_id, user_id);
      if (!checkIsOwned) return res.status(403).send('Forbidden');
      let updatedOrder = await orders.updateOrder(order_id);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
