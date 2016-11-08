const config = require('../config');
const path = require('path');
const componentNameCheck = require('../utils/componentNameCheck');
const trimTemplateFile = require('../utils/trimTemplateFile');

module.exports = {
  description: 'Add a component to the app',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['ES6 Class', 'Stateless Function'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentNameCheck(value) ? 'That component already exists.' : true;
        }
        return 'The name is required.';
      },
    },
    {
      type: 'confirm',
      name: 'wantSCSSModules',
      default: true,
      message: 'Should the component use SCSS Modules?',
    },
    {
      type: 'confirm',
      name: 'wantTest',
      default: true,
      message: 'Should the component have test?',
    },

  ],
  actions: (data) => {
    const componentsDir = config.absPaths.componentsDir;
    const actions = [{
      type: 'add',
      path: componentsDir + '{{properCase name}}/{{properCase name}}.js',
      templateFile: data.type === 'ES6 Class' ?
        './component/es6class.js.hbs' : './component/stateless.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (data.wantSCSSModules) {
      actions.push({
        type: 'add',
        path: componentsDir + '{{properCase name}}/{{properCase name}}.scss',
        templateFile: './component/styles.scss.hbs',
        abortOnFail: true,
      });
    }
    console.log(componentsDir + 'index.js');

    if(config.isFileExist(componentsDir + 'index.js')) {
      // Add component export to index.js in component root folder
      const exportPath = path.resolve(__dirname + '/export.js.hbs');
      actions.push({
        type: 'modify',
        path: componentsDir + 'index.js',
        pattern: /(\/\* Assemble all components for export \*\/)/g,
        template: trimTemplateFile(exportPath),
      });
    }else {
      // Add container export to index.js in container root folder
      actions.push({
        type: 'add',
        path: componentsDir + 'index.js',
        templateFile: './component/export_new.js.hbs',
      });

    }

    if(data.wantTest) {
      const testFileDir = config.absPaths.testRootDir + path.normalize(config.paths.componentsDir);
      data.releativeTestToComponentPath = path.relative(testFileDir, config.absPaths.componentsDir);;
      actions.push({
        type: 'add',
        path: testFileDir + '{{properCase name}}.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      });

    }

    return actions;
  },
};
