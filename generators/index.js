#!/usr/bin/env node

const fs = require('fs');
const config = require('./config');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const pagesGenerator = require('./page/index.js');
var appRoot = require('app-root-path');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('page', pagesGenerator);
  plop.addHelper('uppercase', (text) => {
    return text.toUpperCase();
  });
  plop.addHelper('lowerCase', (text) => {
    return text.toLowerCase();
  });
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(`${config.containersDir}${comp}`, fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
