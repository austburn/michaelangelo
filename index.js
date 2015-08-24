var Rectangle, Circle, Path, Michaelangelo;

Rectangle = require('./lib/rectangle');
Circle = require('./lib/circle');
Path = require('./lib/path');

Michaelangelo = {};
Michaelangelo.Rectangle = Rectangle;
Michaelangelo.Circle = Circle;
Michaelangelo.Path = Path;

module.exports = Michaelangelo;
