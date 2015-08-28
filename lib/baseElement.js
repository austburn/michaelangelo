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
    var attributeKeys, expectedKeys, unexpectedKeys;

    if (this.type === null) {
        throw 'Must define a type.';
    }

    attributeKeys = Object.keys(this.attributes);

    expectedKeys = this.elementKeys.filter(function (key) {
        return attributeKeys.indexOf(key) !== -1;
    });

    if (expectedKeys.length !== this.elementKeys.length) {
        throw 'Element did not contain expected attributes.';
    }

    unexpectedKeys = attributeKeys.filter(function (key) {
        return this.elementKeys.indexOf(key) === -1;
    }, this);

    unexpectedKeys.forEach(function (key) {
        if (this.optionalKeys.indexOf(key) === -1) {
            throw 'Unexpected attribute: \'' + key + '\'.';
        }
    }, this);
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
BaseElement.prototype.optionalKeys = [];
BaseElement.prototype.type = null;

module.exports = BaseElement;
