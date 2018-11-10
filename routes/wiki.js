const express = require('express');

const views = require('../views');
const { Page, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  // res.redirect('/');
  const pages = await Page.findAll();


  res.send(views.main(pages));
});

router.post('/', async (req, res, next) => {

  let {title, content, status, name, email} = req.body;

  try {
    const author = await User.findOrCreate( { where: { name, email } } )[0];

    const page = new Page({ title, content, status });

    await page.save();

    await page.setAuthor(author);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) { next(err); }
});

router.get('/add', (req, res) => {
  res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const foundPage = await Page.findOne( { where: { slug } } );
  if (foundPage !== null) {
    res.send(views.wikiPage(foundPage));
  } else {
    next();
  }
});

module.exports = router;
