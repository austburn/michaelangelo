var BaseElement, Ellipse;

BaseElement = require('./baseElement');

Ellipse = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Ellipse.prototype = Object.create(BaseElement.prototype);

Ellipse.prototype.type = 'ellipse';
Ellipse.prototype.elementKeys = ['x', 'y', 'rx', 'ry'];

module.exports = Ellipse;
