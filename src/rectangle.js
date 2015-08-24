var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

Rectangle.prototype.type = 'rect';
Rectangle.prototype.elementKeys = ['x', 'y', 'height', 'width'];

module.exports = Rectangle;
