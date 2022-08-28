const ProductController = require('../controllers/product.controller');
const productsController = new ProductController();
const router = require('express').Router();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);

// [ONLY ADMIN ROUTES]

router.post('/', productsController.addProduct);
router.post('/multi', productsController.addProducts);
router.put('/', productsController.updateProduct);
router.delete('/', productsController.deleteProduct);

module.exports = router;
