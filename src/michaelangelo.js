var Rectangle, Circle, Path, Michaelangelo;

Rectangle = require('./rectangle');
Circle = require('./circle');
Path = require('./path');

Michaelangelo = {};
Michaelangelo.Rectangle = Rectangle;
Michaelangelo.Circle = Circle;
Michaelangelo.Path = Path;

module.exports = Michaelangelo;
