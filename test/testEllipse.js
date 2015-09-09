/* global describe, it*/
var Ellipse, assert;

assert = require('assert');
Ellipse = require('../lib/ellipse');

describe('ellipse', function () {
  it('validateAttributes does not throw exception for accepted attributes', function () {
    var ellipse;
    ellipse = new Ellipse({cx: 2, cy: 2, rx: 3, ry: 1});
    assert.doesNotThrow(function () {
      ellipse.validateAttributes();
    });
  });

  it('toRaphaelObject adds type', function () {
    var ellipse, raphaelObj;
    ellipse = new Ellipse({cx: 2, cy: 2, rx: 3, ry: 1});
    raphaelObj = ellipse.toRaphaelObject();
    assert.deepEqual(raphaelObj, {
      type: 'ellipse',
      cx: 2,
      cy: 2,
      rx: 3,
      ry: 1
    });
  });
});
