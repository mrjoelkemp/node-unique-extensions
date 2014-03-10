var fs = require('fs'),
    path = require('path');

// Returns a list of all unique file extensions across
// all files in path and path's subfolders
var getUniqueExtensions = module.exports = function (filepath) {
  // Hash to avoid duplicates and membership lookups
  var extensions = arguments[1] || {};

  // For all file names in the current directory
  fs.readdirSync(filepath).forEach(function (filename) {

    var fullName = filepath + '/' + filename;

    // If it's a directory
    if (fs.lstatSync(fullName).isDirectory()) {
      getUniqueExtensions(fullName, extensions);
    }
    else {
      // Add the extension to the table
      extensions[path.extname(filename)] = 1;
    }
  });

  return Object.keys(extensions);
};
