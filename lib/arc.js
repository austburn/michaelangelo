var BaseElement, Arc;

BaseElement = require('./baseElement');

/**
 *  @param attibutes
 *    - cx: the x-coordinate of the center of the arc
 *    - cy: the y-coordinate of the center of the arc
 *    - width: the length of the horizontal axis of the arc
 *    - height: the length of the vertical axis of the arc
 *    - (opt) theta1: the start angle of the arc
 *    - (opt) theta2: the end angle of the arc
*/
Arc = function (attributes, opts) {
  BaseElement.call(this, attributes, opts);
};
Arc.prototype = Object.create(BaseElement.prototype);

Arc.prototype.transformRaphaelObject = function (raphaelObject) {
  var xRadius, yRadius, startPoint, endPoint;

  xRadius = raphaelObject.width / 2;
  yRadius = raphaelObject.height / 2;

  startPoint = this.calculatePointOnEllipse(raphaelObject.cx, raphaelObject.cy, xRadius, yRadius, raphaelObject.theta1);
  endPoint = this.calculatePointOnEllipse(raphaelObject.cx, raphaelObject.cy, xRadius, yRadius, raphaelObject.theta2);

  raphaelObject.path = 'M' + startPoint.x + ',' + startPoint.y + 'A' + xRadius + ',' + yRadius + ' 0 0,1 ' + endPoint.x + ',' + endPoint.y;

  delete raphaelObject.cx;
  delete raphaelObject.cy;
  delete raphaelObject.width;
  delete raphaelObject.height;
  delete raphaelObject.theta1;
  delete raphaelObject.theta2;

  return raphaelObject;
};

/**
 *  @param cx center x of ellipse
 *  @param cy center y of ellipse
 *  @param xRadius ellipse width
 *  @param yRadius ellipse height
 *  @param theta angle at which the point should be caluculated
 *  @returns point {x, y}
 *
 *  Helper function to calculate the point on an ellipse based on the center
 *  and dimensions at a given angle theta. Returns a point.
 */
Arc.prototype.calculatePointOnEllipse = function (cx, cy, xRadius, yRadius, theta) {
  var thetaInRadians, radius;

  thetaInRadians = this.degreesToRadians(theta);
  radius = this.calculateEllipseRadius(xRadius, yRadius, thetaInRadians);

  return {
    x: cx - (radius * Math.cos(thetaInRadians)),
    y: cy + (radius * Math.sin(thetaInRadians))
  };
};

/**
 *  @param theta
 *  @returns angle in radians
 *
 *  Helper function for JS trigonometry
 */
Arc.prototype.degreesToRadians = function (theta) {
  return theta * (Math.PI / 180);
};

/**
 *  @param xRadius ellipse width
 *  @param yRadius ellipse height
 *  @param theta angle at which the radius should be calculated
 *  @returns radius at given angle
 *
 *  Used to find the radius of the ellipse at a given angle
 */
Arc.prototype.calculateEllipseRadius = function (xRadius, yRadius, theta) {
  var a, b;

  a = Math.pow(xRadius, 2) * Math.pow(Math.sin(theta), 2);
  b = Math.pow(yRadius, 2) * Math.pow(Math.cos(theta), 2);

  return (xRadius * yRadius) / Math.sqrt(a + b);
};

Arc.prototype.type = 'path';
Arc.prototype.elementKeys = ['cx', 'cy', 'width', 'height'];
Arc.prototype.defaultAttributes = {
  theta1: 0,
  theta2: 360
};

module.exports = Arc;
