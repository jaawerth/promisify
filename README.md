# promisify
Simple, standalone promisification

This is a no-frills implementation that will work on any asynchronous functions that take node-style callbacks.

You can always use the promisify that comes with [Bluebird](http://bluebirdjs.com/docs/api/promise.promisify.html), but sometimes you may want to keep things native.

## Sample usage
```javascript
var fs = require('fs');
var readFile = promisify(fs.readFile);

readFile('./foo.txt', 'utf8').then(console.log);

// Unbound, it will take on context.
var promiseMe = promisify(function returnMe() {
  return this;
});

promiseMe.call('No!'); // => Resolves to 'No!'

// bind to an optional thisArg if function needs to be called in "foo.bar()" form
var crabWalk = promisify(zoidberg.crabWalk, zoidberg);
crabWalk().then(runAway);
```