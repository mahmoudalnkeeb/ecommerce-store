const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
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

module.exports = router;
