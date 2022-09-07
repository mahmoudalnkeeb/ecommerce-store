const CategoryController = require('../controllers/category.controller');
const AdminsPanelController = require('../controllers/adminsController/adminPanelController');
const checkAdmin = require('../middlewares/checkAdmin');
const categoriesController = new CategoryController();
const adminsPanelController = new AdminsPanelController();
const router = require('express').Router();

router.get('/', categoriesController.getCategories);
router.get('/:catName', categoriesController.getByName);

// [ ADMIN PANEL ROUTES]

router.post('/', checkAdmin, adminsPanelController.createCategory);
// router.post('/multi', checkAdmin); TODO
router.put('/', checkAdmin, adminsPanelController.updateCategory);
router.delete('/', checkAdmin, adminsPanelController.deleteCategory);

module.exports = router;
