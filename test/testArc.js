var Arc, assert;

assert = require('assert');
Arc = require('../lib/arc');

describe('arc', function () {
    it('validateAttributes does not throw exception for accepted attributes', function () {
        var arc;
        arc = new Arc({x: 2, y: 2, width: 3, height: 1});
        assert.doesNotThrow(function () {
            arc.validateAttributes();
        });
    });

    it('toRaphaelObject adds type and calculates path', function () {
        var arc, raphaelObj;
        arc = new Arc({x: 2, y: 2, width: 2, height: 2});
        raphaelObj = arc.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'path',
            path: 'M1,2A1,1 0 0,1 3,2A1,1 0 0,1 1,2'
        });
    });
});
