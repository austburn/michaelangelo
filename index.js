(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BaseElement;

BaseElement = function (attributes, opts) {
    this.attributes = attributes;
    this.opts = opts || {};
};

BaseElement.prototype.adjustAttributes = function (ratio) {
    var newObj;

    newObj = {};

    for (attribute in this.attributes) {
        newObj[attribute] = this.attributes[attribute] * ratio;
    }

    return newObj;
};

BaseElement.prototype.checkAttributes = function () {
    var expectedKeys, attributeKeys;

    if (this.type === null) {
        throw 'Must define a type.';
    }

    expectedKeys = this.elementKeys.sort();
    attributeKeys = Object.keys(this.attributes).sort();

    if (attributeKeys.length !== expectedKeys.length) {
        throw 'Element does not have the expected number of keys.';
    }

    expectedKeys.forEach(function (key, index) {
        if (key !== attributeKeys[index]) {
            throw 'Unexpected attribute: \'' + attributeKeys[index] + '\'.'
        }
    });
};

BaseElement.prototype.toRaphaelObject = function () {
    var raphael;

    try {
        this.checkAttributes();
    } catch (e) {
        throw e;
    }

    if (this.opts.hasOwnProperty('ratio')) {
        raphael = this.adjustAttributes(this.opts.ratio);
    } else {
        raphael = this.attributes;
    }

    raphael.type = this.type;

    for (opt in this.opts) {
        if (opt !== 'ratio') {
            raphael[opt] = this.opts[opt];
        }
    }

    if (this.transformRaphaelObject !== null && typeof this.transformRaphaelObject === 'function') {
        raphael = this.transformRaphaelObject(raphael);
    }

    return raphael;
};

/**
    Essentially a hook for subclasses (currently only Path will use this).

    Reason: I like toRaphaelObject and don't want to dupe the code as the core
    functionality applies to the Raphael Path. The difference is that I have to
    transform the Path params into a path string.

    Based on: http://martinfowler.com/bliki/CallSuper.html
*/
BaseElement.prototype.transformRaphaelObject = null;

BaseElement.prototype.elementKeys = [];
BaseElement.prototype.type = null;

module.exports = BaseElement;

},{}],2:[function(require,module,exports){
var BaseElement, Circle;

BaseElement = require('./baseElement');

Circle = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Circle.prototype = Object.create(BaseElement.prototype);

Circle.prototype.type = 'circle';
Circle.prototype.elementKeys = ['cx', 'cy', 'r'];

module.exports = Circle;

},{"./baseElement":1}],3:[function(require,module,exports){
var Rectangle, Circle, Path, Michaelangelo;

Rectangle = require('./rectangle');
Circle = require('./circle');
Path = require('./path');

Michaelangelo = {};
Michaelangelo.Rectangle = Rectangle;
Michaelangelo.Circle = Circle;
Michaelangelo.Path = Path;

module.exports = Michaelangelo;

},{"./circle":2,"./path":4,"./rectangle":5}],4:[function(require,module,exports){
var BaseElement, Path;

BaseElement = require('./baseElement');

Path = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Path.prototype = Object.create(BaseElement.prototype);

Path.prototype.transformRaphaelObject = function (raphaelObject) {
    raphaelObject.path = 'M' + raphaelObject.x1 + ',' + raphaelObject.y1 + 'L' + raphaelObject.x2 + ',' + raphaelObject.y2;
    delete raphaelObject.x1
    delete raphaelObject.y1
    delete raphaelObject.x2
    delete raphaelObject.y2

    return raphaelObject;
};

Path.prototype.type = 'path';
Path.prototype.elementKeys = ['x1', 'y1', 'x2', 'y2'];

module.exports = Path;

},{"./baseElement":1}],5:[function(require,module,exports){
var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes, opts) {
    BaseElement.call(this, attributes, opts);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

Rectangle.prototype.type = 'rect';
Rectangle.prototype.elementKeys = ['x', 'y', 'height', 'width'];

module.exports = Rectangle;

},{"./baseElement":1}]},{},[3]);
