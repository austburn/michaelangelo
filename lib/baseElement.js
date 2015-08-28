var BaseElement;

BaseElement = function (attributes, opts) {
    this.attributes = attributes;
    this.opts = opts || {};
};

BaseElement.prototype.adjustAttributes = function () {
    var newObj, ratio;

    newObj = {};
    ratio = this.opts.ratio || 1;

    for (attribute in this.attributes) {
        newObj[attribute] = this.attributes[attribute] * ratio;
    }

    for (key in this.defaultAttributes) {
        if (!newObj.hasOwnProperty(key)) {
            newObj[key] = this.defaultAttributes[key] * ratio;
        }
    }

    return newObj;
};

BaseElement.prototype.validateAttributes = function () {
    var attributeKeys, expectedKeys, optionalKeys, unexpectedKeys;

    if (this.type === null) {
        throw 'Must define a type.';
    }

    attributeKeys = Object.keys(this.attributes);
    optionalKeys = Object.keys(this.defaultAttributes);
    allowedKeys = this.elementKeys.concat(optionalKeys);

    attributeKeys.forEach(function (key) {
        if (allowedKeys.indexOf(key) === -1) {
            throw 'Unexpected attribute: \'' + key + '\'.';
        }
    });
};

BaseElement.prototype.toRaphaelObject = function () {
    var raphael;

    try {
        this.validateAttributes();
    } catch (e) {
        throw e;
    }

    raphael = this.adjustAttributes();

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
BaseElement.prototype.defaultAttributes = {};
BaseElement.prototype.type = null;

module.exports = BaseElement;
