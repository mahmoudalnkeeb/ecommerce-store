const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const adminsPanelRouter = require('./adminsPanel');
const ordersRouter = require('./orders');
const checkAuth = require('../middlewares/checkAuth');
const md2html = require('../utils/md2html');
const { upload } = require('../controllers/uploadController');
const multer = require('multer');
const uploadAsset = multer({ storage: multer.memoryStorage() });

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

// upload route

router.post('/upload', uploadAsset.single('asset'), upload);

// Restapi Routes
router.use('/', authRouter);
router.use('/user', usersRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/admins-panel', adminsPanelRouter);
router.use('/orders', checkAuth, ordersRouter);

module.exports = router;
