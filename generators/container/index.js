const path = require('path');
const config = require('../config');
const componentNameCheck = require('../utils/componentNameCheck');
const trimTemplateFile = require('../utils/trimTemplateFile');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Scalable',
      validate: value => {
        if ((/.+/).test(value)) {
          return componentNameCheck(value + 'Container.js') ? 'A container with this name already exists' : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantModule',
      default: true,
      message: 'Do you want module for this container?',
    },
  ],
  actions: (data) => {
    const containersDir = config.absPaths.containersDir;

    const actions = [{
      type: 'add',
      path: containersDir + '{{properCase name}}Container.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }];

    if(config.isFileExist(containersDir + 'index.js')) {
      const exportPath = path.resolve(__dirname + '/export.js.hbs');
      // Add container export to index.js in container root folder
      actions.push({
        type: 'modify',
        path: containersDir + 'index.js',
        pattern: /(\/\* Assemble all containers for export \*\/)/g,
        template: trimTemplateFile(exportPath),
      });
    }else {
      // Add container export to index.js in container root folder
      actions.push({
        type: 'add',
        path: containersDir + 'index.js',
        templateFile: './container/export_new.js.hbs',
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantModule) {
      const modulePathDir = config.absPaths.modulesDir;
      const modulePath = modulePathDir + '{{lowerCase name}}-module.js';

      // Constants
      actions.push({
        type: 'add',
        path: modulePath,
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Actions
      actions.push({
        type: 'modify',
        path: modulePath,
        pattern: /(\/\/Further code goes here)/g,
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'modify',
        path: modulePath,
        templateFile: './container/reducer.js.hbs',
        pattern: /(\/\/Further code goes here)/g,
        abortOnFail: true,
      });

    }

    return actions;
  },
};
