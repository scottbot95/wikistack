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
  try {
    const user = await User.create(req.body);
    if (user) {
      res.redirect('/users/'+user.id);
    } else {
      next({
        error:'Failed to create user',
        reason: 'UNKNOWN',
        request: req.body
      });
    }
  } catch (err) { next(err); }
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
  try {
    const [numChanged] = await User.update(req.body, {
      where: { id: req.params.userId }
    });

    if (numChanged) {
      res.redirect('/users/'+req.params.userId);
    } else {
      next();
    }
  } catch (err) { next(err); }


  res.send(`PUT to /users/${req.params.userId}`);
})
.delete(async (req, res, next) => {
  try {
    const numChanged = await User.destroy({
      where:{
        id:req.params.userId
      }
    });
    if (numChanged) {
      res.redirect('/');
    } else {
      next();
    }
  } catch (err) { next(err); }
});

module.exports = router;
