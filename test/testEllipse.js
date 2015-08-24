var Ellipse, assert;

assert = require('assert');
Ellipse = require('../lib/ellipse');

describe('ellipse', function() {
    it('checkAttributes does not throw exception for accepted attributes', function () {
        var ellipse;
        ellipse = new Ellipse({x: 2, y: 2, rx: 3, ry: 1});
        assert.doesNotThrow(function () {
            ellipse.checkAttributes();
        });
    });

    it('toRaphaelObject adds type', function () {
        var ellipse, raphaelObj;
        ellipse = new Ellipse({x: 2, y: 2, rx: 3, ry: 1});
        raphaelObj = ellipse.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'ellipse',
            x: 2,
            y: 2,
            rx: 3,
            ry: 1
        });
    });
});
