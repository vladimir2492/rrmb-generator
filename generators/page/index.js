/**
 * Page Generator
 */
const config = require('../config');
const componentNameCheck = require('../utils/componentNameCheck');
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
          return componentNameCheck(value) ?
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
      default: false,
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

    if(config.isFileExist(pagesDir + 'export.js')) {
      const exportPath = path.resolve(__dirname + '/index.js.hbs');
      // Add container export to index.js in container root folder
      actions.push({
        type: 'modify',
        path: pagesDir + 'index.js',
        pattern: /(\/\* Assemble all pages for export \*\/)/g,
        template: trimTemplateFile(exportPath),
      });
    }else {
      // Add container export to index.js in container root folder
      actions.push({
        type: 'add',
        path: pagesDir + 'index.js',
        templateFile: './component/export_new.js.hbs',
      });

    }

    if(data.tryAddRoute) {
      data.releativePageToRoutePath = path.relative(config.absPaths.routePath, pagesDir);;

      if(!config.isFileExist(config.absPaths.routePath)) {
        throw "Route file not found";
      }

     actions.push({
        type: 'modify',
        path: config.absPaths.routePath,
        pattern: /(\/\/NEXT ROUTE)/g,
        template: trimTemplateFile('generators/page/route.js.hbs'),
      });


    }


    return actions;
  },
};
