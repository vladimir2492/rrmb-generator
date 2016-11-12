const fs = require('fs');
const path = require('path');
const objectAssign = require('object-assign');

var rrmbPJ = {};
try{
    const packageJSON = require(path.resolve('package.json'));
    rrmbPJ = (packageJSON && packageJSON.rrmb) || {};
}catch(err) {

}

var externalConfig = {};
try {
    console.log(path.resolve('.rrmb'));

    externalConfig = JSON.parse(fs.readFileSync(path.resolve('.rrmb'), 'utf8'));
}catch(err) {
    console.warn("Missing config file or it is not valid.");
}

const isDirExist = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err)  {
        //console.log(err);
        return false;
    }
}

const prepareReleativePath = (filePath) => {
    return filePath.replace(/[\\]/g, '/')
}

const isFileExist = (filePath) => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err)  {
        //console.log(err);
        return false;
    }
}

const options = objectAssign( {}, {
    wantRootReducerDefault: true,
    addPageRouteDefault: false,
}, rrmbPJ.options, externalConfig.options );

const paths = objectAssign( {}, {
    componentsDir: 'app/src/components/',
    containersDir: 'app/src/containers/',
    pagesDir: 'app/src/pages/',
    modulesDir: 'app/src/modules/',
    testRootDir: '__test__/',
    routeFile: 'app/src/routes.js',
    rootReducerPath: "app/src/reducer.js",
}, rrmbPJ.paths, externalConfig.paths );

const functions = {
    isDirExist,
    isFileExist,
    prepareReleativePath
};

const getAbsPath = (obj) => {
    const results = {};
    for(const str in obj) {
        results[str] = path.resolve(obj[str]);
        console.log(str, obj[str].lastIndexOf('.js'), obj[str].length, obj[str].lastIndexOf('.js') === obj[str].length - 3)
        if (obj[str].lastIndexOf('.js') !== obj[str].length - 3)  {
            results[str] += '/';
        }
    }
    return results;
}

module.exports = Object.assign({}, functions, {paths, absPaths: getAbsPath(paths), options});
