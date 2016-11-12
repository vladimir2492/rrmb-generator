# React Redux Module Based Generator (rrmb-generator) 
Generator for module based code for redux, Inspired by scalable-react-boilerplate

## Install
`npm install rrmb-generator`

Open package json and add generate command within the scripts option
```
"scripts": {
    "generate": "generate",
    "generate:component": "npm run generate component",
    "generate:container": "npm run generate container",
    "generate:page": "npm run generate page"
}
```

## Why
There are different typef of generator to help create react and redux based application.
They are doing great job with action, enums and reducers generation, but based on exist 
experince we belive that module based structuring is more relaiable way to go. This generator
created in mind to provide efficient way for page, container and component generation. 

## Generators
The package contains generators for easy project scaffolding.  Generator help to generate following components.
- Container `npm run generate:container`
  - Name: the name of the container, i.e. `Awesome`, which converts to: `AwesomeContainer`
  - Connected / Not connected ES6 Class containers (higher order)
  - SCSS Modules
  - Modules
- Component `npm run generate:component`
  - Name: the name of the component, i.e. `Button`
  - Stateless functional components (recommended)
  - ES6 class components
  - SCSS modules
  - Tests for all of the above
- Page `npm run generate:page`
  - Name: The name of the route, i.e. Home, which gets converted to `HomePage`

To run the generators with a list of options, run
```
npm run generate
```

Follow the on screen prompts to select the options you wish to use.

For convenience, you can bypass the initial selection and scaffold out containers, components and pages by running

```
npm run generate:<type_of_component>
```

where <type_of_component> is one of: component, container or page. 

The generators use the same feature-first file organization as the rest of the project, encapsulating components within their own folder.

## More

If you want to add routing for generating pages follow the steps
In your route file add pages import
```
import * as Pages from 'some/dir/pages';
```

Then leave the bot mark (// BOT: NEXT ROUTE) in place where new routes should be added
```
<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Pages.WelcomePage} />
        <Route path="login" component={Pages.LoginPage} />
        // BOT: NEXT ROUTE
        <Route path="*" component={Pages.NotFoundPage} />
      </Route>
    </Router>
  </Provider>
```


## Configs
The generators output paths can be configured in two ways.

package.json

You just need create rrmb properties in package.json file and give relative paths
```
 "rrmb": {
    "paths": {
      "componentsDir": "src/components/"
    }
  }
```

 .rrmb
 
Create ".rrmb" file in the root directory (where package.json is)

Set your custom configs there as json data
```
{
	"paths": {
		"componentsDir": "src/components/",
		"containersDir": "src/containers/",
		"pagesDir": "src/pages/",
		"modulesDir": "src/modules/",
		"testRootDir": "__test__/",
		"routeFile": "src/routes.js"
	}
}
```