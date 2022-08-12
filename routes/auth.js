const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authControllers = new AuthController();
const router = express.Router();

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/auth', authControllers.checkIsAuth);

module.exports = router;
