const express = require('express');

const views = require('../views');
const wiki = require('./wiki');
const user = require('./user');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/wiki');
});

router.use('/wiki', wiki);

router.use('/users', user);


module.exports = router;
