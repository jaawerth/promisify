
'use strict';

function promisify(nodebackFn, context) {
  if (arguments.length >= 2) {
    return boundPromisify(nodebackFn, context);
  } else {
    return unboundPromisify(nodebackFn);
  }
}

function unboundPromisify(nodebackFn) {
  return function promisified() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push(function callback(err, res) {
        if (err) reject(err); else resolve(res);
      });
      nodebackFn.apply(this, args);
    });
  };
}

function boundPromisify(nodebackFn, thisArg) {
  return function promisfied() {
    var args = Array.prototype.slice.call(arguments);
    return new Promise((resolve ,reject) => {
      args.push(function callback(err, res) {
        if (err) reject(err); else resolve(res);
      });
      nodebackFn.apply(thisArg, args);
    });
  };
}


module.exports = promisify;