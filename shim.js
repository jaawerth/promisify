'use strict';

var Promise   = require('es6-promise').Promise;
var promisify = require('./');

module.exports = promisify.create(Promise);
