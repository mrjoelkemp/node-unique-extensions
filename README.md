Returns a list of unique file extensions within the supplied directory.

`npm install node-unique-extensions`

### Usage

```javascript```
var gux = require('node-unique-extensions');

var exclusions = ['node_modules'];

console.log(gux('.', exclusions))
```

* `exclusions` array is optional

### Notes

* Currently synchronous. Haven't had a need for an async version yet.
* Excludes files without an extension (ex: Makefile)