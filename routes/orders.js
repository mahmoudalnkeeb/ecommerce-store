const OrderController = require('../controllers/orderController');
let ordersController = new OrderController();
const router = require('express').Router();

router.post('/create', ordersController.createOrder);
router.get('/:id', ordersController.getOrderById);
router.get('/carte', ordersController.getUserOrders);
router.put('/update', ordersController.updateOrder);
router.delete('/delete', ordersController.deleteOrder);

module.exports = router;
