const Sequelize = require('sequelize');


// title => string
// slug => string? (validated)
// content => TEXT (so it can store a lot)
// status => boolean?

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
  });

  return Page;
};
