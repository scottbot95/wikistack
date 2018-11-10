const express = require('express');

const router = express.Router();


// chaining middleware for specific router
router.route('/')
.get((req, res) => { // GET '/'
  res.send('get all users');
})
.post((req, res) => { // POST '/'
  res.send('post to /users');
});

router.route('/:userId')
.get((req, res) => {
  res.send(`GET to /users/${req.params.userId}`);
})
.put((req, res) => {
  res.send(`GET to /users/${req.params.userId}`);
})
.delete((req, res) => {
  res.send(`GET to /users/${req.params.userId}`);
});

module.exports = router;
