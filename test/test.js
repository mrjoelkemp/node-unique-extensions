var getExtensions = require('../index');

var extensions = getExtensions('.');

console.log('Extensions found: ', extensions);
console.log(extensions.length === 4);
console.log(!! ~extensions.indexOf('.html'));
console.log(!! ~extensions.indexOf('.css'));
console.log(!! ~extensions.indexOf('.coffee'));
console.log(!! ~extensions.indexOf('.js'));