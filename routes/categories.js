const CategoryController = require('../controllers/category.controller');
const categoriesController = new CategoryController();
const router = require('express').Router();

router.get('/', categoriesController.getCategories);
router.get('/:catName', categoriesController.getByName);

// [ONLY ADMIN ROUTES]

router.post('/', categoriesController.create);
router.post('/multi');
router.put('/', categoriesController.update);
router.delete('/', categoriesController.delete);

module.exports = router;
