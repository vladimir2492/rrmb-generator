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
      type: 'input',
      name: 'componentName',
      message: 'For what component this container made for? Leave it empty if there is no component for it.',
      default: '',
      validate: value => {
        if (!value) {
          return true;
        }

        return componentNameCheck(value, 1) ? true : 'A component with this name note exists';
      },
    },
    {
      type: 'confirm',
      name: 'wantModule',
      default: true,
      message: 'Do you want module for this container?',
    },
    {
      type: 'input',
      name: 'actionsNames',
      default: "default +defaultAsync",
      message: 'Input actions names by separating them with whitespace or/and comma. If action is async put plus sign on it. Ex: create, edit, +update',
    },
    {
      type: 'confirm',
      name: 'wantRootReducer',
      default: config.options.wantRootReducerDefault,
      message: 'Do you want create/modify root reducer?',
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
        pattern: /(BOT: New containers goes here)/g,
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

    data.newComponent = true;
    data.notNewComponent = false;
    if (data.componentName) {
      data.newComponent = false;
      data.notNewComponent = true;
      const componentName = data.componentName;
      const componentPath = config.absPaths.componentsDir + componentName;
      const componentReleativePath = path.relative(containersDir, componentPath);
      data.componentReleativePath = componentReleativePath;
    }

    // If they want actions and a reducer, generate module.js and the corresponding tests for actions and the reducer
    if (data.wantModule) {

      if (!data.actionsNames) {
        data.actionsNames = "{{constantCase name}}_ACTION";
      }

      const actionsNames = data.actionsNames.split(/[, ]+/gm).map( actionName => {
        const async = actionName.indexOf('+') == 0;
        actionName = actionName.replace(/^[+]?/g, '');
        return {name: actionName, sync: !async, async};
      }).filter( action => {
        return action.name;
      });
      data.actionsNames = actionsNames;
      console.log(actionsNames);

      const modulePathDir = config.absPaths.modulesDir;
      const modulePath = modulePathDir + '{{lowerCase name}}-module.js';
      const containerModuleReleativePath = path.relative(containersDir, modulePathDir);
      data.containerModuleReleativePath = containerModuleReleativePath;

      if (data.wantRootReducer) {
        const rootReducerPath = config.absPaths.rootReducerPath;
        const rootReducerReleativePath = path.relative(path.dirname(config.absPaths.rootReducerPath), modulePathDir);
        data.rootReducerReleativePath = rootReducerReleativePath;

        if(!config.isFileExist(rootReducerPath)) {
          actions.push({
            type: 'add',
            path: rootReducerPath,
            templateFile: './container/root-reducer_new.js.hbs',
            abortOnFail: true,
          });
        }

        actions.push({
          type: 'modify',
          path: rootReducerPath,
          pattern: /(BOT: Reducer list here)/g,
          template:
              `$1
  {{lowerCase name}}: {{lowerCase name}}Reducer,`,
          abortOnFail: true,
        }, {
          type: 'modify',
          path: rootReducerPath,
          pattern: /(BOT: Reducer imports here)/g,
          template:
              `$1
import {{lowerCase name}}Reducer from '{{rootReducerReleativePath}}/{{lowerCase name}}-module'`,
          abortOnFail: true,
        });

      }
      // Actions
      actions.push({
        type: 'add',
        path: modulePath,
        templateFile: './container/module.js.hbs',
        abortOnFail: true,
      });

    }

    return actions;
  },
};
