var BaseElement, Arc;

BaseElement = require('./baseElement');

Arc = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Arc.prototype = Object.create(BaseElement.prototype);

Arc.prototype.transformRaphaelObject = function (raphaelObject) {
    var x, y, xRadius, yRadius;
    x = raphaelObject.x;
    y = raphaelObject.y;
    xRadius = raphaelObject.width / 2;
    yRadius = raphaelObject.height / 2;

    raphaelObject.path = 'M' + (x - xRadius) + ',' + y +
                            'A' + xRadius + ',' + yRadius + ' 0 0,1 ' + (x + xRadius) + ',' + y +
                            'A' + xRadius + ',' + yRadius + ' 0 0,1 ' + (x - xRadius) + ',' + y;

    delete raphaelObject.x;
    delete raphaelObject.y;
    delete raphaelObject.width;
    delete raphaelObject.height;
    return raphaelObject;
};

Arc.prototype.type = 'path';
Arc.prototype.elementKeys = ['x', 'y', 'width', 'height'];

module.exports = Arc;