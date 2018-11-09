  const Sequelize = require('sequelize');


// name (fullname) => STRING

// email

module.exports = (db) => {
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });

  return User;
};
