var BaseElement, assert;

assert = require('assert');
BaseElement = require('../lib/baseElement');

describe('baseElement', function () {
    it('adjustAttributes returns adjusted object', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5
        }, {ratio: 2});
        adjusted = element.adjustAttributes();

        assert.deepEqual(adjusted, {attribute: 10});
    });

    it('adjustAttributes adds default attributes', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5
        }, {ratio: 2});
        element.defaultAttributes = {
            attribute2: 7
        };
        adjusted = element.adjustAttributes();

        assert.deepEqual(adjusted, {attribute: 10, attribute2: 14});
    });

    it('adjustAttributes respects passed in attribute', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5,
            attribute2: 9
        }, {ratio: 2});
        element.defaultAttributes = {
            attribute2: 7
        };
        adjusted = element.adjustAttributes();

        assert.deepEqual(adjusted, {attribute: 10, attribute2: 18});
    });

    it('validateAttributes throws exception if type is not set', function () {
        var element;
        element = new BaseElement({attribute: 'attribute1'});

        assert.throws(function () {
            element.validateAttributes();
        }, /Must define a type\./);
    });

    it('validateAttributes throws exception if attributes do not match', function () {
        var element;
        element = new BaseElement({x: 0, y: 0, bad: 1});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];

        assert.throws(function () {
            element.validateAttributes();
        }, /Unexpected attribute: \'bad\'\./);
    });

    it('validateAttributes allows required attributes without optional attributes', function () {
        var element;
        element = new BaseElement({x: 0, y: 0});
        element.type = 'element';
        element.elementKeys = ['x', 'y'];
        element.defaultAttributes = {'height': 'default'};

        assert.doesNotThrow(function () {
            element.validateAttributes();
        });
    });

    it('validateAttributes allows optional attributes', function () {
        var element;
        element = new BaseElement({x: 0, y: 0, height: 1});
        element.type = 'element';
        element.elementKeys = ['x', 'y'];
        element.defaultAttributes = {'height': 'default'};

        assert.doesNotThrow(function () {
            element.validateAttributes();
        });
    });

    it('toRaphaelObject', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 0, y: 0, width: 1});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 0,
            y: 0,
            width: 1
        });
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

    it('transformRaphaelObject has access to default attributes', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 1, y: 2, width: 3}, {ratio: 2, 'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        element.defaultAttributes = {
            height: 7
        };
        element.transformRaphaelObject = function (obj) {
            obj.height = obj.height/2;
            return obj;
        };

        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 2,
            y: 4,
            width: 6,
            height: 7,
            'stroke-width': 2
        });
    });

    it('toRaphaelObject respects optional attributes', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 0, y: 0, width: 1, height: 3}, {'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        element.defaultAttributes = {'height': 0};
        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 0,
            y: 0,
            width: 1,
            height: 3,
            'stroke-width': 2
        });
    });

    it('toRaphaelObject adds default attributes', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 0, y: 0, width: 1}, {'stroke-width': 2});
        element.type = 'element';
        element.elementKeys = ['x', 'y', 'width'];
        element.defaultAttributes = {'height': 0};
        raphaelObj = element.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'element',
            x: 0,
            y: 0,
            width: 1,
            height: 0,
            'stroke-width': 2
        });
    });
});
