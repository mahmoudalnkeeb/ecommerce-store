const router = require('express').Router();
const authRouter = require('./auth');

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

module.exports = router;
