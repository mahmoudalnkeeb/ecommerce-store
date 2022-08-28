const pool = require('../configs/db');
const Product = require('../models/product');
const generateId = require('../utils/id');

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

  // [ONLY ADMINS CONTROLLER METHODS]

  // add single product
  async addProduct(req, res, next) {
    try {
      let {
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      } = req.body;
      if(!productId) productId = generateId()
      let addedProducts = await products.addProduct({
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      });
      res.status(201).json(addedProducts);
    } catch (error) {
      next(error);
    }
  }

  // add product form array of objects
  async addProducts(req, res, next) {
    try {
      let { productsArr } = req.body;
      let addedProducts = await products.addProducts(productsArr);
      res.status(201).json(addedProducts);
    } catch (error) {
      next(error);
    }
  }

  // update product data
  async updateProduct(req, res, next) {
    try {
      let {
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      } = req.body;
      let updatedProduct = await products.updateProduct({
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  // delete product
  async deleteProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProductController;
