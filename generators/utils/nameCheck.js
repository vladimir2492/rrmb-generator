const fs = require('fs');
const config = require('./../config');

const getFilesNames = (dirs) => {
  var allFiles = [];
  const filesArray = dirs.forEach( (dir) => {
    const files = config.isDirExist(dir) ? fs.readdirSync(dir) : [];
    allFiles = allFiles.concat(files);
  });
  return allFiles;
}

const nameCheckDir = (component, dirs) => {
  const components = getFilesNames(dirs);
  console.log("Componenets", components);
  return components.indexOf(component) >= 0;
}

module.exports = nameCheckDir;
