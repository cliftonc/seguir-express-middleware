'use strict';

var express = require('express');
var expect = require('expect.js');
var mw = require('../../index.js');

var apiFn = function() {};

describe('Basic Middleware', function() {
    it('returns a router', function(done) {
      var middleware = mw({}, express, {}, apiFn);
      expect(typeof middleware).to.be('function');
      expect(middleware.toString()).to.contain('router');
      done();
    });
});
