const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const authControllers = new AuthController();

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/auth', authControllers.checkIsAuth);

module.exports = router;
