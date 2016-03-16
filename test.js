'use strict';
var test             = require('tape');
var runner           = require('./test-runner');
var promisify        = require('./');
var shimmedPromisify = require('./shim');

test('Works with global promise', function(t) {
  runner(promisify, t.test);
});

test('Works with es6-promise shim', function(t) {
  runner(shimmedPromisify, t.test);
});