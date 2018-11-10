const express = require('express');

const { User, Page } = require('../models');
const { userList, userPages } = require('../views');

const router = express.Router();


// chaining middleware for specific router
router.route('/')
.get(async (req, res, next) => { // GET '/'
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) { next(err); }
})
.post(async (req, res, next) => { // POST '/'
  res.send('post to /users');
});

router.route('/:userId')
.get(async (req, res, next) => {
  try {
    const pages = await Page.findAll({
      include: [{model: User, as: 'author'}],
      where: { // maybe better way to do this?
        authorId: req.params.userId
      }
    });
    // console.log(pages);
    if (pages.length === 0) {
      next();
    }

    res.send(userPages(pages[0].author, pages));
    // res.send('Working On it!')
  } catch (err) { next(err); }
})
.put(async (req, res, next) => {
  res.send(`PUT to /users/${req.params.userId}`);
})
.delete(async (req, res, next) => {
  res.send(`DELETE to /users/${req.params.userId}`);
});

module.exports = router;
