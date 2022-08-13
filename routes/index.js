const router = require('express').Router();
const checkDev = require('../middlewares/checkDev');
const authRouter = require('./auth');
const devRouter = require('./dev_routes');

// views routes
router.get('/', (req, res) => {
  res.send(
    `<p style="font-family:monospace;font-size : 2.5em ;">
        ecommerce is working use 
            <mark style="background-color: lightgray;">/docs</mark>
            <br>
        to get documetation page
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
router.use('/dev', checkDev, devRouter);

module.exports = router;
