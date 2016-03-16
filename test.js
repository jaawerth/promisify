'use strict';

var test      = require('tape');
var promisify = require('./promisify.dist.js');


function timeoutCB(withError, withValue, callback) {
  setTimeout(function(err, val) {
    callback(err, val);
  }, 20, withError, withValue);
}

function timeoutThisCB(callback) {
  var what = this;
  setTimeout(function(self) {
    callback(null, self);
  }, 20, what);
}

var timeout = promisify(timeoutCB);
var timeoutBlank = promisify(timeoutThisCB);
var timeoutDog = promisify(timeoutThisCB, 'woof!');


test('resolves with value', function(t) {
  timeout(null, 42).then(function(result) {
    t.equals(result, 42);
    t.end();
  }).catch(function(err) {
    t.fail("Promise shouln't have thrown: " + err);
  });
});

test('rejects with error', function(t) {
  timeout(new Error('Newp!'), undefined).then(function(result) {
    t.fail('Promise should have rejected, not resoolved with ' + result);
    t.end();
  }).catch(function(err) {
    t.pass("Promise shouldn't have rejected: " + err);
    t.end();
  });
});

test('Promisified function is unbound without thisArg', function(t) {
  t.plan(2);

  timeoutBlank().then(function(self) {
    t.equals(typeof self, 'undefined', 'unbound and without context, "this" is undefined');
  }).catch(function(err) {
    t.fail('Promise should not have rejected - got error ' + err);
  });

  timeoutBlank.call('aw yiss').then(function(result) {
    t.equals(result, 'aw yiss', 'when unbound, will pick up "this" value from context');
  }).catch(function(err) {
    t.fail('Promise should not have rejected: ' + err);
  });
});

test('Promisified function is bound with thisArg', function(t) {
  timeoutDog().then(function(res) {
    t.equals(res, 'woof!', 'resolved with expected thisArg');
    t.end();
  }).catch(function(err) {
    t.fail('Should not have thrown with error ' + err);
    t.end();
  });
});