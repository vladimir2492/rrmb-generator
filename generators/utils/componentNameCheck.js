const fs = require('fs');
const config = require('./../config');

const pageComponents = config.isDirExist(config.absPaths.componentsDir) ? fs.readdirSync(config.absPaths.componentsDir) : [];
const pageContainers = config.isDirExist(config.absPaths.containersDir) ? fs.readdirSync(config.absPaths.containersDir) : []
const components = pageComponents.concat(pageContainers);

const componentNameCheck = (component) => {
  return components.indexOf(component) >= 0;
}

module.exports = componentNameCheck;
