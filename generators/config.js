const fs = require('fs');
const path = require('path');

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

const paths = {
    componentsDir: 'app/src/components/',
    containersDir: 'app/src/containers/',
    pagesDir: 'app/src/pages/',
    modulesDir: 'app/src/modules/',
    testRootDir: '__test__/',
    routeFile: 'app/src/routes.js',
};

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