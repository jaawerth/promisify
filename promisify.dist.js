
'use strict';

var _newArrowCheck2 = require('babel-runtime/helpers/newArrowCheck');

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promisify(nodebackFn, context) {
  if (arguments.length >= 2) {
    return boundPromisify(nodebackFn, context);
  } else {
    return unboundPromisify(nodebackFn);
  }
}

function unboundPromisify(nodebackFn) {
  return function promisified() {
    var _this = this;

    var args = Array.prototype.slice.call(arguments);
    return new _promise2.default(function (resolve, reject) {
      (0, _newArrowCheck3.default)(this, _this);

      args.push(function callback(err, res) {
        if (err) reject(err);else resolve(res);
      });
      nodebackFn.apply(this, args);
    }.bind(this));
  };
}

function boundPromisify(nodebackFn, thisArg) {
  return function promisfied() {
    var _this2 = this;

    var args = Array.prototype.slice.call(arguments);
    return new _promise2.default(function (resolve, reject) {
      (0, _newArrowCheck3.default)(this, _this2);

      args.push(function callback(err, res) {
        if (err) reject(err);else resolve(res);
      });
      nodebackFn.apply(thisArg, args);
    }.bind(this));
  };
}

module.exports = promisify;
