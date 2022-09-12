const pool = require('../configs/db');
const Product = require('../models/product');


const products = new Product(pool);

class ProductController {
  // products page [HOME]
  async getProducts(req, res, next) {
    try {
      let { page, sort } = req.query;
      let productsArr = await products.getProducts(sort, page);
      res.status(200).json(productsArr);
    } catch (error) {
      next(error);
    }
  }

  // get product by id [PRODUCT PAGE]
  async getProductById(req, res, next) {
    try {
      let { productId } = req.params;
      let product = await products.getProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProductController;
