var fs    = require('fs'),
    path  = require('path'),
    ExclusionManager = require('exclusion-manager');

// Hash to avoid duplicates and membership lookups
// Outside of the closure because of the recursive definition
var extensions = {};

// Returns a list of all unique file extensions across
// all files in path and path's subfolders
// Precond: exclusions is an array of folder names to exclude from the search
var getUniqueExtensions = module.exports = function (options) {
  var filepath        = options.path || '',
      emanager        = options.exclusions || [],
      includeDotFiles = options.includeDotFiles || false;

  // Convert the given list in the first call
  // Gets ignored in subsequent recursions
  if (emanager instanceof Array) {
    emanager = new ExclusionManager(options.exclusions);
  }

  // For all file names in the current directory
  fs.readdirSync(filepath).forEach(function (filename) {

    var fullName    = filepath + '/' + filename,
        isDirectory = fs.lstatSync(fullName).isDirectory(),
        ext         = path.extname(filename),
        baseName;

    if (isDirectory) {
      // It's not on the ignore list
      if (emanager.shouldIgnore(filename)) return;

      // if (exclusions.length && shouldBeIgnored(filename, exclusions)) return;

      // Grab the directory's unique extensions
      getUniqueExtensions({
        path:            fullName,
        exclusions:      emanager,
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