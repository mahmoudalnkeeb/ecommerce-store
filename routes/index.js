const express = require('express');
const { port } = require('../configs/env');
const router = express.Router();
const authRouter = require('./auth');

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
router.use('/', authRouter);
module.exports = router;
