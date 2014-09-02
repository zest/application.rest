'use strict';
var rest = require('../lib'),
    expect = require('chai').expect;
describe('application.rest', function () {
    // it should return a module
    it('it should return a module', function () {
        expect(rest).not.to.equal(undefined);
    });
});
