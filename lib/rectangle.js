var BaseElement, Rectangle;

BaseElement = require('./baseElement');

/**
  @param attributes
    - x: x-coordinate of the top left corner
    - y: y-coordinate of the top left corner
    - width: width of the rectangle
    - height: height of the rectangle
*/
Rectangle = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

Rectangle.prototype.type = 'rect';
Rectangle.prototype.elementKeys = ['x', 'y', 'height', 'width'];

module.exports = Rectangle;
