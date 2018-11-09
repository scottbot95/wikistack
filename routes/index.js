const express = require('express');
const views = require('../views');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(views.main());
});


module.exports = router;
