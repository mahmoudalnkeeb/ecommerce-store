const UserController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/checkAuth');
const usersController = new UserController();
const router = require('express').Router();

router.get('/:id', checkAuth, usersController.getById);
router.get('/check-email/:email', usersController.checkEmail);
router.get('/check-username/:username', usersController.checkUsername);
router.get('/:id', checkAuth, usersController.getById);
router.put('/', checkAuth, usersController.updateUser);
router.put('/password', checkAuth, usersController.updatePassword);
router.delete('/', checkAuth, usersController.deleteUser);

module.exports = router;
