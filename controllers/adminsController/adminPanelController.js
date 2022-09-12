const pool = require('../../configs/db');
const { JWT_SECRET } = require('../../configs/env');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');
const Token = require('../../utils/jwt');
const Product = require('../../models/product');
const Category = require('../../models/category');
const tokens = new Token(jwt, JWT_SECRET);
const admins = new Admin(pool);
const products = new Product(pool);
const categories = new Category(pool);
const generateId = require('../../utils/id');

class AdminsPanelController {
  // [ADMINS AUTH METHODS]
  async createAdmin(req, res, next) {
    try {
      let { adminFullname, adminUsername, adminPassword, adminEmail } =
        req.body;
      let adminId = await admins.create({
        adminFullname,
        adminUsername,
        adminPassword,
        adminEmail,
      });
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async panelLogin(req, res, next) {
    try {
      let { username, password } = req.body;
      if (!(await admins.checkAdminPass(username, password)))
        return res.status(403).send('Forbidden');
      let adminId = await admins.getAdminId(username);
      let token = tokens.createToken({ adminId });
      await admins.updateAcessToken(adminId, token);
      res.status(200).json({ token: token });
    } catch (error) {
      next(error);
    }
  }

  // [PRODUCTS METHODS]

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
      if (!productId) productId = generateId();
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

  // [CATEGORIES METHODS]

  async createCategory(req, res, next) {
    try {
      let { catName, catImage, catDesc } = req.body;
      let category = await categories.create({ catName, catImage, catDesc });
      res.status(201).json(`${category} created successfully`);
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req, res, next) {
    try {
      let { catName, catImage, catDesc, catId } = req.body;
      let newCat = await categories.update({
        catName,
        catImage,
        catDesc,
        catId,
      });
      res.status(200).json(newCat);
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      let { catId } = req.body;
      await categories.delete(catId);
      res.status(204).json({ msg: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  // [USERS METHODS] : TODO
}

module.exports = AdminsPanelController;
