const fs = require('fs');
const path = require('path');
const objectAssign = require('object-assign');

let rrmbPJ = {};
try{
    const packageJSON = require(path.resolve('package.json'));
    rrmbPJ = (packageJSON && packageJSON.rrmb) || {};
}catch(err) {

}

let externalConfig = {};
try {
    console.log(path.resolve('.rrmb'));

    externalConfig = JSON.parse(fs.readFileSync(path.resolve('.rrmb'), 'utf8'));
}catch(err) {
    console.warn("Missing config file or it is not valid.", err);
}

const isDirExist = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err)  {
        //console.log(err);
        return false;
    }
}

const isFileExist = (filePath) => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err)  {
        //console.log(err);
        return false;
    }
}

const paths = objectAssign( {}, {
    componentsDir: 'app/src/components/',
    containersDir: 'app/src/containers/',
    pagesDir: 'app/src/pages/',
    modulesDir: 'app/src/modules/',
    testRootDir: '__test__/',
    routeFile: 'app/src/routes.js',
}, rrmbPJ.paths, externalConfig.paths );

const functions = {
    isDirExist,
    isFileExist
};

const getAbsPath = (obj) => {
    const results = {};
    for(const str in obj) {
        results[str] = path.resolve(obj[str]) + '/';
    }
    return results;
}

module.exports = Object.assign({}, functions, {paths, absPaths: getAbsPath(paths)});