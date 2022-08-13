const DevController = require('../controllers/dev.controller');
const router = require('express').Router();
const devControllers = new DevController();

router.get('/user/:id', devControllers.getUser);

module.exports = router;
