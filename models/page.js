const Sequelize = require('sequelize');


// title => string
// slug => string? (validated)
// content => TEXT (so it can store a lot)
// status => boolean?

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

module.exports = (db) => {
  const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  }, {
    hooks: {
      beforeValidate: (page) => {
        page.title = page.title.replace(/[ ]{2,}/g, ' ');
        page.slug = generateSlug(page.title);
      }
    }
  });

  return Page;
};
