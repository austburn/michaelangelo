var BaseElement, Path;

BaseElement = require('./baseElement');

/**
 *  @param attributes
 *    - x1: the x-coordinate of the start point
 *    - y1: the y-coordinate of the start point
 *    - x2: the x-coordinate of the end point
 *    - y2: the y-coordinate of the end point
*/
Path = function (attributes, opts) {
  BaseElement.call(this, attributes, opts);
};
Path.prototype = Object.create(BaseElement.prototype);

/**
 *  Constructs a pathString from the given coordinates.
 */
Path.prototype.transformRaphaelObject = function (raphaelObject) {
  raphaelObject.path = 'M' + raphaelObject.x1 + ',' + raphaelObject.y1 + 'L' + raphaelObject.x2 + ',' + raphaelObject.y2;

  delete raphaelObject.x1;
  delete raphaelObject.y1;
  delete raphaelObject.x2;
  delete raphaelObject.y2;

  return raphaelObject;
};

Path.prototype.type = 'path';
Path.prototype.elementKeys = ['x1', 'y1', 'x2', 'y2'];

module.exports = Path;
