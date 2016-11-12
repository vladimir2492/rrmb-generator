const fs = require('fs');
const config = require('./../config');
const nameCheck = require('./nameCheck');

const componentNameCheck = (component) => {
  return nameCheck(component, [config.absPaths.componentsDir, config.absPaths.containersDir]);
}

module.exports = componentNameCheck;
