const express = require('express');
const Sequelize = require('sequelize');

const views = require('../views');
const { Page, User } = require('../models');

const router = express.Router();

const Op = Sequelize.Op;

router.get('/', async (req, res) => {
  // res.redirect('/');
  const pages = await Page.findAll();


  res.send(views.main(pages));
});

router.post('/', async (req, res, next) => {

  let {title, content, status, name, email} = req.body;

  try {
    const [user] = await User.findOrCreate({
      where: { name, email }
    });

    const page = await Page.create({ title, content, status });

    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) { next(err); }
});

router.get('/add', (req, res) => {
  res.send(views.addPage());
});

router.get('/search', async (req, res, next) => {
  const search = req.query.search || '';
  const searchTerm = {
    [Op.and]: search.split(' ').map(word => {return {[Op.iLike]: `%${word}%`};})
  };
  console.log(searchTerm);
  try {
    const results = await Page.findAll({
      where: {
        [Op.or]: [
          {title: searchTerm},
          {content: searchTerm}
        ]
      }
    });

    res.send(views.searchResults(results, search));
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      include: [{model: User, as: 'author'}],
      where: req.params
    });
    if (foundPage !== null) {
      res.send(views.wikiPage(foundPage));
    } else {
      next();
    }
  } catch (err) { next (err); }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      include: [{model: User, as: 'author'}],
      where: req.params
    });
    if (page) {

      res.send(views.editPage(page));
    } else {
      next();
    }
  } catch (err) { next(err); }
});

router.get('/:slug/similar', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne( { where: req.params } );
    if (foundPage !== null) {
      res.redirect('/wiki/search?search=' + encodeURIComponent(foundPage.title));
    } else {
      next();
    }
  } catch (err) { next (err); }
});

router.post('/:slug', async (req, res, next) => {
  const [numChanged] = await Page.update(req.body, {
    where: req.params
  });

  if (numChanged) {
    res.redirect('/wiki/'+req.params.slug);
  } else { next(); }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const numChanged = await Page.destroy({
      where: req.params
    });

    if (numChanged) {
      res.redirect('/');
    } else {
      next();
    }
  } catch (err) { next(err); }
});

module.exports = router;
