# promisify
Simple, standalone promisification

This is a straightforward, no-frills implementation that will work on any asynchronous functions that take node-style callbacks.

You can always use the promisify that comes with [Bluebird](http://bluebirdjs.com/docs/api/promise.promisify.html), but sometimes you may want to keep things native.

## Installation
```
npm install @jaawerth/promisify
```

## Usage
```javascript
var promisify = require('@jaawerth/promisify');
promisify(asyncCallbackFn[, thisArg]);
```

### Use the global Promise constructor, the included shim, OR bring your own

#### Global Promise object (default)
```javascript
const promisify = require('@jaawerth/promisify');
const readFile = promisify(require('fs').readFile);

readFile('./foo.txt', 'utf8').then(console.log);
```

#### Custom Promise constructor
Just make sure your Promise implementation adheres to the Promise constructor's API and behavior, and you can instantiate a promisify that will use it.

```javascript
promisify = promisify.create(MyPromise);
```

#### Shim (uses [es6-promise](https://www.npmjs.com/package/es6-promise))
```javascript
var promisify = require('@jaawerth/promisify/shim');
```

### Keep the promisified function bound to its context as needed
```javascript
var crabWalk = promisify(zoidberg.crabWalk, zoidberg);
crabWalk().then(runAway);
```

### Or don't!
Just like any unbound function, you can manipulate context at will.

```javascript
var promiseMe = promisify(function returnMe() {
  return this;
});

promiseMe.call('No!'); // => Resolves to 'No!'
```
