
var fs = require('fs');

var package = require('../frontend/package.json');
var scripts = require('./heroku-scripts.json');

package.scripts = scripts;

fs.writeFile('package.json', JSON.stringify(package, null, 2), 'utf8', () => {});
fs.copyFile('./frontend/package-lock.json', './package-lock.json', () => {});
