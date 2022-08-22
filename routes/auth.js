const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/checkAuth');
const { validateLogin, validateSignup } = require('../middlewares/validate');
const authControllers = new AuthController();

router.post('/login', validateLogin, authControllers.login);
router.post('/signup', validateSignup, authControllers.signup);
router.post('/auth', authControllers.checkIsAuth);
router.put('/logout', isAuth, authControllers.logout);

module.exports = router;

