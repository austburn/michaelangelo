var BaseElement;

/**
 *  @param attributes
 *  @param opts - see http://raphaeljs.com/reference.html#Element.attr
*/
BaseElement = function (attributes, opts) {
  this.attributes = attributes;
  this.opts = opts || {};
};

/**
 *  This function will return a new object with all the default attributes
 *  added if needed.
 */
BaseElement.prototype.createDefaultObject = function () {
  var newObj;

  newObj = {};

  for (var attribute in this.attributes) {
    newObj[attribute] = this.attributes[attribute];
  }

  for (var key in this.defaultAttributes) {
    if (!newObj.hasOwnProperty(key)) {
      newObj[key] = this.defaultAttributes[key];
    }
  }

  return newObj;
};

/**
 *  Asserts that the element has all required elementKeys and that
 *  optional keys are allowed.
 *
 *  @throws Error
 */
BaseElement.prototype.validateAttributes = function () {
  var attributeKeys, optionalKeys, allowedKeys;

  if (this.type === null) {
    throw 'Must define a type.';
  }

  attributeKeys = Object.keys(this.attributes);
  optionalKeys = Object.keys(this.defaultAttributes);
  allowedKeys = this.elementKeys.concat(optionalKeys);

  this.elementKeys.forEach(function (key) {
    if (attributeKeys.indexOf(key) === -1) {
      throw '\'' + key + '\' is required.';
    }
  });

  attributeKeys.forEach(function (key) {
    if (allowedKeys.indexOf(key) === -1) {
      throw 'Unexpected attribute: \'' + key + '\'.';
    }
  });
};

/**
 *  Transforms a Michaelangelo object by translating all given attributes
 *  into those expected by Rapahel. Will call transformRaphaelObject if
 *  defined.
 *
 * @throws Error
 */
BaseElement.prototype.toRaphaelObject = function () {
  var raphael;

  try {
    this.validateAttributes();
  } catch (e) {
    throw e;
  }

  raphael = this.createDefaultObject();

  raphael.type = this.type;

  for (var opt in this.opts) {
    raphael[opt] = this.opts[opt];
  }

  if (this.transformRaphaelObject !== null && typeof this.transformRaphaelObject === 'function') {
    raphael = this.transformRaphaelObject(raphael);
  }

  return raphael;
};

/**
 *  Hook for subclasses.
 *
 *  Reason: I like toRaphaelObject and don't want to dupe the code as the core
 *  functionality applies to the Raphael Path. The difference is that I have to
 *  transform the Path params into a path string.
 *
 *  Based on: http://martinfowler.com/bliki/CallSuper.html
 */
BaseElement.prototype.transformRaphaelObject = null;

BaseElement.prototype.elementKeys = [];
BaseElement.prototype.defaultAttributes = {};
BaseElement.prototype.type = null;

module.exports = BaseElement;
