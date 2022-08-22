const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const checkRole = require('../middlewares/checkRole')
// views routes
router.get('/', (req, res) => {
  res.send(
    `<p style="font-family:monospace;font-size : 2.5em ;">
        ecommerce is working for docs click here
            <a style="text-decoration:none" href="/docs"><mark style="background-color: lightgray;">/docs</mark></a>
            <br>
     </p>`
  );
});
router.get('/docs', (req, res) => {
  res.render('docs', {
    title: 'docs',
    header: 'documentation',
  });
});

// Restapi Routes
router.use('/', authRouter);
router.use('/', checkRole, usersRouter);

module.exports = router;
