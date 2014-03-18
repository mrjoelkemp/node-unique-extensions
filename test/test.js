var getExtensions = require('../index');

// List of directories to ignore
var exclusions = ['node_modules', '.git', '.sass-cache', 'bower_components'];

// Run from the root folder
var extensions = getExtensions('.', exclusions);

console.log('Extensions found: ', extensions);
console.log(extensions.length === 6);
console.log(!! ~extensions.indexOf('.html'));
console.log(!! ~extensions.indexOf('.css'));
console.log(!! ~extensions.indexOf('.coffee'));
console.log(!! ~extensions.indexOf('.js'));
console.log(!! ~extensions.indexOf('.json'));
console.log(!! ~extensions.indexOf('.md'));