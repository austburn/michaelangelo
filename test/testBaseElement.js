/* global describe, it*/
var BaseElement, assert;

assert = require('assert');
BaseElement = require('../lib/baseElement');

describe('baseElement', function () {
  it('createDefaultObject returns new object', function () {
    var element, adjusted;
    element = new BaseElement({
      attribute: 5
    });
    adjusted = element.createDefaultObject();

    assert.deepEqual(adjusted, {attribute: 5});
  });

  it('createDefaultObject adds default attributes', function () {
    var element, adjusted;
    element = new BaseElement({
      attribute: 5
    });
    element.defaultAttributes = {
      attribute2: 7
    };
    adjusted = element.createDefaultObject();

    assert.deepEqual(adjusted, {attribute: 5, attribute2: 7});
  });

  it('createDefaultObject respects passed in attribute', function () {
    var element, adjusted;
    element = new BaseElement({
      attribute: 5,
      attribute2: 9
    });
    element.defaultAttributes = {
      attribute2: 7
    };
    adjusted = element.createDefaultObject();

    assert.deepEqual(adjusted, {attribute: 5, attribute2: 9});
  });

  it('validateAttributes throws exception if type is not set', function () {
    var element;
    element = new BaseElement({attribute: 'attribute1'});

    assert.throws(function () {
      element.validateAttributes();
    }, /Must define a type\./);
  });

  it('validateAttributes throws exception if object does not contain required keys', function () {
    var element;
    element = new BaseElement({x: 0, y: 0});
    element.type = 'element';
    element.elementKeys = ['x', 'y', 'width'];

    assert.throws(function () {
      element.validateAttributes();
    }, /\'width\' is required\./);
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

  it('transformRaphaelObject is called', function () {
    var element, raphaelObj;
    element = new BaseElement({x: 1, y: 2, width: 3}, {'stroke-width': 2});
    element.type = 'element';
    element.elementKeys = ['x', 'y', 'width'];
    element.transformRaphaelObject = function (obj) {
      obj.type = 'iTransform';
      return obj;
    };

    raphaelObj = element.toRaphaelObject();

    assert.deepEqual(raphaelObj, {
      type: 'iTransform',
      x: 1,
      y: 2,
      width: 3,
      'stroke-width': 2
    });
  });

  it('transformRaphaelObject has access to default attributes', function () {
    var element, raphaelObj;
    element = new BaseElement({x: 1, y: 2, width: 3}, {'stroke-width': 2});
    element.type = 'element';
    element.elementKeys = ['x', 'y', 'width'];
    element.defaultAttributes = {
      height: 8
    };
    element.transformRaphaelObject = function (obj) {
      obj.height = obj.height / 2;
      return obj;
    };

    raphaelObj = element.toRaphaelObject();

    assert.deepEqual(raphaelObj, {
      type: 'element',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
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
