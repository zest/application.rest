'use strict';
var embodier = require('./injector')();
describe('application.embodier', function () {
    // it should return a module
    it('it should return a module', function () {
        expect(embodier).not.toBe(undefined);
    });
});
