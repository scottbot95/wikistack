const pagesList = require('./pagesList');

module.exports = (user, pages) => pagesList(pages, `Pages written by ${user.name}`, false);
