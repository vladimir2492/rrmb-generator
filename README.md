# React Redux Module Based Generator (rrmb-generator) 
Generator for module based code for redux, Inspired by scalable-react-boilerplate

## Install
`npm install rrmb-generator`
Open package json and add add generate command under the scripts option
"scripts": {
    "generate": "generate",
}


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
