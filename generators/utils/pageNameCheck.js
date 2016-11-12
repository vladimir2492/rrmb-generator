const fs = require('fs');
const config = require('./../config');
const nameCheck = require('./nameCheck');

const pagesNameCheck = (component) => {
  return nameCheck(component, [config.absPaths.pagesDir]);
}

module.exports = pagesNameCheck;
