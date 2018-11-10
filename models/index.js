const  Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/wikistack', {
  logging: false
});

const Page = require('./page')(db);
const User = require('./user')(db);

const init = async () => {
  db.authenticate().then(() => {
    console.log('Database Engaged!');
  });

  Page.belongsTo(User, {as: 'author'});

  await db.sync({force: false});
};


module.exports = {
  db,
  init,
  Page,
  User
};
