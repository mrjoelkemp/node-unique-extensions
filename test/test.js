var getExtensions = require('../index');

// List of directories to ignore
var exclusions = ['node_modules', '.git', '.sass-cache', 'bower_components', 'vendor'];

// Run from the root folder
var extensions = getExtensions({
  path: __dirname,
  exclusions: exclusions,
  includeDotFiles: true
});

console.log('Extensions found: ', extensions);
console.log(extensions.length === 5);
console.log(!! ~extensions.indexOf('.html'));
console.log(!! ~extensions.indexOf('.css'));
console.log(!! ~extensions.indexOf('.coffee'));
console.log(!! ~extensions.indexOf('.js'));
console.log(!! ~extensions.indexOf('.jshintrc'));