const pool = require('../configs/db');
const Category = require('../models/category');

const categories = new Category(pool);

class CategoryController {
  async getCategories(req, res, next) {
    try {
      let allCategories = await categories.getCategories();
      res.status(200).json(allCategories);
    } catch (error) {
      next(error);
    }
  }
  async getByName(req, res, next) {
    try {
      let { catName } = req.params;
      let cat = await categories.getByName(catName);
      res.status(200).json(cat);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CategoryController;
