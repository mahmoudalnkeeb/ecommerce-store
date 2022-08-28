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

  // [ONLY ADMINS CONTROLLERS]
  async create(req, res, next) {
    try {
      let { catName, catImage, catDesc } = req.body;
      let category = await categories.create({ catName, catImage, catDesc });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
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
  async delete(req, res, next) {
    try {
      let { catId } = req.body;
      await categories.delete(catId);
      res.status(204).json({ msg: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CategoryController;
