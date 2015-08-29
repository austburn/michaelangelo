var BaseElement, Arc;

BaseElement = require('./baseElement');

Arc = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Arc.prototype = Object.create(BaseElement.prototype);

Arc.prototype.transformRaphaelObject = function (raphaelObject) {
    var xRadius, yRadius, theta1, startRadius, endRadius, startX, startY, endX, endY, path;

    xRadius = raphaelObject.width / 2;
    yRadius = raphaelObject.height / 2;

    startPoint = this.calculatePointOnEclipse(raphaelObject.x, raphaelObject.y, xRadius, yRadius, raphaelObject.theta1);
    endPoint = this.calculatePointOnEclipse(raphaelObject.x, raphaelObject.y, xRadius, yRadius, raphaelObject.theta2);

    raphaelObject.path = 'M' + startPoint.x + ',' + startPoint.y + 'A' + xRadius + ',' + yRadius + ' 0 0,1 ' + endPoint.x + ',' + endPoint.y;

    delete raphaelObject.x;
    delete raphaelObject.y;
    delete raphaelObject.width;
    delete raphaelObject.height;
    delete raphaelObject.theta1;
    delete raphaelObject.theta2;

    return raphaelObject;
};

Arc.prototype.calculatePointOnEclipse = function (x, y, xRadius, yRadius, theta) {
    var thetaInRadians, radius;

    thetaInRadians = this.degreesToRadians(theta);
    radius = this.calculateEllipseRadius(xRadius, yRadius, thetaInRadians);

    return {
        x: x - (radius * Math.cos(thetaInRadians)),
        y: y + (radius * Math.sin(thetaInRadians))
    };
};

Arc.prototype.degreesToRadians = function (angle) {
    return angle * (Math.PI / 180);
};

Arc.prototype.calculateEllipseRadius = function (xRadius, yRadius, angle) {
    var a, b;

    a = Math.pow(xRadius, 2) * Math.pow(Math.sin(angle), 2);
    b = Math.pow(yRadius, 2) * Math.pow(Math.cos(angle), 2);

    return (xRadius * yRadius) / Math.sqrt(a + b);
};

Arc.prototype.type = 'path';
Arc.prototype.elementKeys = ['x', 'y', 'width', 'height'];
Arc.prototype.defaultAttributes = {
    theta1: 0,
    theta2: 360
};

module.exports = Arc;
