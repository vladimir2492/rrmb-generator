const fs = require('fs');
const config = require('./../config');

const pageComponents = config.isDirExist(config.componentsDir) ? fs.readdirSync(config.componentsDir) : [];
const pageContainers = config.isDirExist(config.containersDir) ? fs.readdirSync(config.containersDir) : []
const components = pageComponents.concat(pageContainers);

const componentNameCheck = (component) =>
  components.indexOf(component) >= 0;

module.exports = componentNameCheck;
