'use strict';

module.exports = create(global.Promise);

function create(Promise) {
  promisify.create = create; // So we can instantiate with compliant promises

  function promisify(nodebackFn, context) {
    if (arguments.length >= 2) {
      return boundPromisify(nodebackFn, context);
    } else {
      return unboundPromisify(nodebackFn);
    }
  }

  function unboundPromisify(nodebackFn) {
    return function promisified(...args) {
      return new Promise((resolve, reject) => {
        args.push(function callback(err, res) {
          if (err) reject(err); else resolve(res);
        });
        nodebackFn.apply(this, args);
      });
    };
  }

  function boundPromisify(nodebackFn, thisArg) {
    return function promisfied(...args) {
      return new Promise((resolve ,reject) => {
        args.push(function callback(err, res) {
          if (err) reject(err); else resolve(res);
        });
        nodebackFn.apply(thisArg, args);
      });
    };
  }

  return promisify;
}
