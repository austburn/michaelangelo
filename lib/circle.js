var BaseElement, Circle;

BaseElement = require('./baseElement');

/**
 *  @param attributes
 *    - cx: the x-coordinate of the center of the circle
 *    - cy: the y-coordinate of the center of the circle
 *    - r: the radius of the circle
*/
Circle = function (attributes, opts) {
  BaseElement.call(this, attributes, opts);
};
Circle.prototype = Object.create(BaseElement.prototype);

Circle.prototype.type = 'circle';
Circle.prototype.elementKeys = ['cx', 'cy', 'r'];

module.exports = Circle;
