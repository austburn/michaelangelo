var BaseElement, Circle;

BaseElement = require('./baseElement');

Circle = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Circle.prototype = Object.create(BaseElement.prototype);

Circle.prototype.type = 'circle';
Circle.prototype.elementKeys = ['cx', 'cy', 'r'];

module.exports = Circle;
