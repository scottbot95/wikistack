const express = require('express');

const wiki = require('./wiki');
const user = require('./user');
const missing = require('./404');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/wiki');
});

router.use('/wiki', wiki);

router.use('/users', user);

router.get('/404', missing());

router.use((req, res) => {
  res.redirect(`/404?from=${encodeURIComponent(req.url)}`);
});

module.exports = router;
