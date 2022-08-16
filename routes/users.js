const UserController = require('../controllers/user.controller');
const usersController = new UserController();
const isAuth = require('../middlewares/checkAuth');
const router = require('express').Router();

router.get('/user/:id', isAuth, usersController.getById);
router.put('/user', isAuth, usersController.updateUser);
router.put('/user/password', isAuth, usersController.updatePassword);

module.exports = router;
