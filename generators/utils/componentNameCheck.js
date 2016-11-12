const fs = require('fs');
const config = require('./../config');
const nameCheck = require('./nameCheck');

const componentNameCheck = (component, type) => {
  var dirs = [];
  if(!type) {
    dirs = [config.absPaths.componentsDir, config.absPaths.containersDir];
  } else if(type === 1) {
    dirs = [config.absPaths.componentsDir];
  } else if(type === 2) {
    dirs = [config.absPaths.containersDir];
  }
  return nameCheck(component, dirs);
}

module.exports = componentNameCheck;
