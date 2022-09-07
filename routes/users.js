const UserController = require('../controllers/user.controller');
const usersController = new UserController();
const router = require('express').Router();

router.get('/:id', usersController.getById);
router.get('/check-email/:email', usersController.checkEmail);
router.get('/check-username/:username', usersController.checkUsername);
router.get('/:id', usersController.getById);
router.put('/', usersController.updateUser);
router.put('/password', usersController.updatePassword);
router.delete('/', usersController.deleteUser);

module.exports = router;
