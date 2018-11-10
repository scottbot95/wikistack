const pagesList = require('./pagesList');

module.exports = (results, search) =>
  pagesList(results, `Search results for '${search}'`, search);
