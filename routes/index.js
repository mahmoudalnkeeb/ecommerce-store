const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const adminsPanelRouter = require('./adminsPanel');
const checkAuth = require('../middlewares/checkAuth');
const md2html = require('../utils/md2html');
// views routes
router.get('/', (req, res) => {
  res.render('index', {
    title: 'store',
  });
});
router.get('/docs', (req, res) => {
  const html = md2html();
  res.send(`
  <link rel="stylesheet" href="./stylesheets/style.css">
    ${html}
  `);
});

// Restapi Routes
router.use('/', authRouter);
router.use('/user', checkAuth, usersRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/admins-panel', adminsPanelRouter);

module.exports = router;
