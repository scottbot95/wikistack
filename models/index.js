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

  await Page.belongsTo(User, {as: 'author'});
  await User.hasMany(Page, {as: 'author', foreignKey:'authorId'});

  await db.sync({force: false});
};


module.exports = {
  db,
  init,
  Page,
  User
};
