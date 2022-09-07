const ProductController = require('../controllers/product.controller');
const AdminsPanelController = require('../controllers/adminsController/adminPanelController');
const checkAdmin = require('../middlewares/checkAdmin');
const productsController = new ProductController();
const adminsPanelController = new AdminsPanelController();
const router = require('express').Router();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);

// [ADMIN PANEL ROUTES]

router.post('/', checkAdmin, adminsPanelController.addProduct);
// router.post('/multi', checkAdmin, adminsPanelController.addProducts); TODO
router.put('/', checkAdmin, adminsPanelController.updateProduct);
router.delete('/', checkAdmin, adminsPanelController.deleteProduct);

module.exports = router;
