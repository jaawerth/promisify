'use strict';

module.exports = create(global.Promise);

function create(Promise) {
  promisify.create = create; // So we can instantiate with compliant promises

  function promisify(nodebackFn, context) {
    const useContext = arguments.length >= 2;
    return function promisified(...args) {
      const thisArg = useContext ? context : this;
      return new Promise((resolve ,reject) => {
        args.push(function callback(err, res) {
          if (err) reject(err); else resolve(res);
        });
        Reflect.apply(nodebackFn, thisArg, args);
      });
    };
  }

  return promisify;
}
