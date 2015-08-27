var Rectangle, Circle, Path, Ellipse, Arc, Michaelangelo;

Rectangle = require('./lib/rectangle');
Circle = require('./lib/circle');
Path = require('./lib/path');
Ellipse = require('./lib/ellipse');
Arc = require('./lib/arc');

Michaelangelo = {};
Michaelangelo.Rectangle = Rectangle;
Michaelangelo.Circle = Circle;
Michaelangelo.Path = Path;
Michaelangelo.Ellipse = Ellipse;
Michaelangelo.Arc = Arc;

module.exports = Michaelangelo;
