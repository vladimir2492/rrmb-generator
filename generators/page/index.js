const path = require('path');
const config = require('../config');
const pagesNameCheck = require('../utils/pageNameCheck');
const trimTemplateFile = require('../utils/trimTemplateFile');

module.exports = {
  description: 'Add a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the page component?',
      default: 'About',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return pagesNameCheck(value + 'Page') ?
            'That component already exists. Please choose another name for your page component.' : true;
        }
        return 'The name is required.';
      },
    }, {
      type: 'input',
      name: 'path',
      message: 'Enter the path of the page component.',
      default: '/about',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }

        return 'path is required';
      },
    },  {
      type: 'confirm',
      name: 'tryAddRoute',
      default: config.options.addPageRouteDefault,
      message: 'Try add route to this page?',
    },
  ],


  actions: data => {
    const pagesDir = config.absPaths.pagesDir;

    // Generate index.js and index.module.scss
    const actions = [{
      type: 'add',
      path: pagesDir + '{{properCase name}}Page/{{properCase name}}Page.js',
      templateFile: './page/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: pagesDir + '{{properCase name}}Page/{{properCase name}}Page.scss',
      templateFile: './page/index.module.scss.hbs',
      abortOnFail: true,
    }];

    if(config.isFileExist(pagesDir + 'index.js')) {
      const exportPath = path.resolve(__dirname + '/export.js.hbs');
      // Add container export to index.js in container root folder
      actions.push({
        type: 'modify',
        path: pagesDir + 'index.js',
        pattern: /(BOT: New pages goes here)/g,
        template: trimTemplateFile(exportPath),
      });
    }else {
      // Add container export to index.js in container root folder
      actions.push({
        type: 'add',
        path: pagesDir + 'index.js',
        templateFile: './page/export_new.js.hbs',
      });

    }

    if(data.tryAddRoute) {
      data.releativePageToRoutePath = path.relative(config.absPaths.routeFile, pagesDir);

      if(!config.isFileExist(config.absPaths.routeFile)) {
        throw new Error("Route file not found");
      }

      const routeTemplatePath = path.resolve(__dirname + '/route.js.hbs');
      actions.push({
        type: 'modify',
        path: config.absPaths.routeFile,
        pattern: /(BOT: NEXT ROUTE)/g,
        template: trimTemplateFile(routeTemplatePath),
      });

    }


    return actions;
  },
};
