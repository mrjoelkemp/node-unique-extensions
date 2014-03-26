var fs    = require('fs'),
    path  = require('path');

// Hash to avoid duplicates and membership lookups
// Outside of the closure because of the recursive definition
var extensions = {};

// Returns a list of all unique file extensions across
// all files in path and path's subfolders
// Precond: exclusions is an array of folder names to exclude from the search
var getUniqueExtensions = module.exports = function (options) {
  var filepath        = options.path || '',
      exclusions      = options.exclusions || [],
      includeDotFiles = options.includeDotFiles || false;

  // For all file names in the current directory
  fs.readdirSync(filepath).forEach(function (filename) {

    var fullName    = filepath + '/' + filename,
        isDirectory = fs.lstatSync(fullName).isDirectory(),
        ext         = path.extname(filename),
        baseName;

    if (isDirectory) {
      // It's not on the ignore list
      if (exclusions.length && shouldBeIgnored(filename, exclusions)) return;

      getUniqueExtensions({
        path: fullName,
        exclusions: exclusions,
        includeDotFiles: includeDotFiles
      });

    // It's a regular file
    } else if (ext) {
      // Add the extension to the table
      extensions[ext] = 1;

    // It's a dotfile (doesn't have an extension according to node)
    } else if (includeDotFiles && ((baseName = path.basename(filename))[0] === '.')) {
      extensions[baseName] = 1;
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