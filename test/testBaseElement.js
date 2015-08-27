var BaseElement, assert;

assert = require('assert');
BaseElement = require('../lib/baseElement');

describe('baseElement', function () {
    it('adjustAttributes returns adjusted object', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5
        });
        adjusted = element.adjustAttributes(2);

        assert.deepEqual(adjusted, {attribute: 10});
    });

    it('checkAttributes throws exception if type is not set', function () {
        var element;
        element = new BaseElement({attribute: 'attribute1'});

        assert.throws(function () {
            element.checkAttributes();
        }, /Must define a type\./);
    });

    it('checkAttributes throws exception if there are the wrong number of attributes', function () {
        var element;
        element = new BaseElement({attribute: 'attribute1'});
        element.type = 'element';

        assert.throws(function () {
            element.checkAttributes();
        }, /Element does not have the expected number of keys\./);
    });

    it('checkAttributes throws exception if there are invalid attributes', function () {
        var element;
        element = new BaseElement({x: 0, y: 0, bad: 1});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];

        assert.throws(function () {
            element.checkAttributes();
        }, /Unexpected attribute: 'bad'\./);
    });

    it('toRaphaelObject adds options', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 0, y: 0, width: 1}, {'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 0,
            y: 0,
            width: 1,
            'stroke-width': 2
        });
    });

    it('toRaphaelObject adjusts and adds options', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 1, y: 2, width: 3}, {ratio: 2, 'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 2,
            y: 4,
            width: 6,
            'stroke-width': 2
        });
    });

    it('transformRaphaelObject is called', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 1, y: 2, width: 3}, {ratio: 2, 'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        element.transformRaphaelObject = function (obj) {
            obj.type = 'iTransform';
            return obj;
        };

        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'iTransform',
            x: 2,
            y: 4,
            width: 6,
            'stroke-width': 2
        });
    });
});
