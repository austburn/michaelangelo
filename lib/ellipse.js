var BaseElement, Ellipse;

BaseElement = require('./baseElement');

/**
 @param attributes
   - cx: the x-coordinate of the center of the ellipse
   - cy: the y-coordinate of the center of the ellipse
   - rx: the length of the horizontal axis of the ellipse
   - ry: the length of the vertical axis of the ellipse
*/
Ellipse = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Ellipse.prototype = Object.create(BaseElement.prototype);

Ellipse.prototype.type = 'ellipse';
Ellipse.prototype.elementKeys = ['cx', 'cy', 'rx', 'ry'];

module.exports = Ellipse;
