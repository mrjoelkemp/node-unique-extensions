Returns a list of unique file extensions within the supplied directory.

`npm install node-unique-extensions`

### Usage

```javascript```
var gux = require('node-unique-extensions');

var dirsToIgnore = ['node_modules'];

var extensions = gux({
  path: '.',
  // These are optional
  exclusions: dirsToIgnore,
  includeDotFiles: true
})
```

### Options

The following options are supported:

* `path`: the path to traverse for unique file extensions
* [`exclusions`]: an optional array of directory names to ignore
* [`includeDotFiles`]: Node doesn't consider dotfiles to have an extension, but this flag is useful
if you want to detect dotfiles like `.jshintrc`.

### Notes

* Currently synchronous.
* Excludes files without an extension (ex: Makefile)