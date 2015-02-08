'use strict';

var expect = require('expect.js');
var mw = require('../../index.js');

describe('Basic Middleware', function() {
    it('returns a router', function(done) {
      expect(typeof mw({})).to.be('function');
      expect(mw({}).toString()).to.contain('router');
      done();
    });
});
