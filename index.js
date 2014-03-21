var fs = require('fs'),
    path = require('path');

// Hash to avoid duplicates and membership lookups
var extensions = {};

// Returns a list of all unique file extensions across
// all files in path and path's subfolders
// Precond: exclusions is an array of folder names to exclude from the search
var getUniqueExtensions = module.exports = function (filepath, exclusions) {
  // For all file names in the current directory
  fs.readdirSync(filepath).forEach(function (filename) {

    var fullName    = filepath + '/' + filename,
        isDirectory = fs.lstatSync(fullName).isDirectory(),
        ext         = path.extname(filename);

    if (isDirectory) {
      // It's not on the ignore list
      if ((exclusions && ! shouldBeIgnored(filename, exclusions)) ||
          // Or there is no ignore list
          (! exclusions || exclusions.length === 0)) {
        getUniqueExtensions(fullName);
      }

    // It's a regular file
    } else {
      // Ignore files without an extension
      if (ext) {
        // Add the extension to the table
        extensions[ext] = 1;
      }
    }
  });

  return Object.keys(extensions);
};

function shouldBeIgnored(filename, exclusions) {
  var result = false;

  exclusions = exclusions || [];

  for (var i = 0, l = exclusions.length; i < l; i++) {
    // If any part of the file's name (absolute or relative)
    // contains an excluded folder, it should be ignored
    if (filename.indexOf(exclusions[i]) !== -1) {
      result = true;
      break;
    }
  }

  return result;
}