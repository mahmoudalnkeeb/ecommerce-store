const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { validateLogin, validateSignup } = require('../middlewares/validate');
const authControllers = new AuthController();

router.post('/login', validateLogin, authControllers.login);
router.post('/signup', validateSignup, authControllers.signup);
router.post('/auth', authControllers.checkIsAuth);

module.exports = router;