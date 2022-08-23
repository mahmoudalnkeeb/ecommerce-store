const UserController = require('../controllers/user.controller');
const usersController = new UserController();
const router = require('express').Router();

router.get('/:id', usersController.getById);
router.put('/', usersController.updateUser);
router.put('/password', usersController.updatePassword);

module.exports = router;
