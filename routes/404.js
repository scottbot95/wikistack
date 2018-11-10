const marked = require('marked');
const html = require('html-template-tag');

const layout = require('../views/layout');
const { Page } = require('../models');


module.exports = () => {
  return async (req, res, next) => {
    try {
      const pages = await Page.findAll();
      let randomPage = '';
      if (pages.length > 0) {
        const rand = Math.floor(Math.random() * pages.length);
        const choice = pages[rand];

        randomPage = `Perhaps you'd like to try [${choice.title}](/wiki/${choice.slug})`;
      }
      res.send(layout(marked(`# Sorry :(
## We couldn't find "${req.query.from}"
${randomPage}
      `)));
    } catch (err) { next(err); }
  };
};
