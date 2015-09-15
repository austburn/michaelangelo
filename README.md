# Michaelangelo
Michaelangelo enables you to easily build vector graphics for structures you already have specifications for via [Raphael](https://github.com/DmitryBaranovskiy/raphael/) that was inspired by the Python module [matplotlib](https://github.com/matplotlib/matplotlib).

I actually built Michaelangelo as a result of trying to draw an NBA court in Rapahel. The biggest problem I had was translating what I wanted into SVG. I was trying to build paths, arcs, and even normal objects. I spent too much time learning SVG and doing math that I knew I'd have to redo. I decided to shift gears and start building Michaelangelo to increase my productivity on my NBA project. After building a good portion of Michaelangelo, my code to construct an NBA court was reduced to around [10 lines](https://github.com/austburn/nba-js/blob/master/app/court/court.js#L20-L31).

## Using
Currently, Michaelangelo provides abstractions some of the elements you can create in
Raphael. The abstraction isn't much currently, but it provides namespacing and the ability
to easily scale your graphics.

For the following code samples, I will demonstrate how you might fulfill the same task
in Raphael vs. Michaelangelo.

```javascript
// Vanilla Raphael
var Raphael;

Raphael = require('raphael');

// Create a 400x400 canvas with a 10x10 rectangle in the top left
Raphael(['canvas', 400, 400, {
  type: 'rect',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  stroke: '#000'
}]);
```

```javascript
// Raphael with Michaelangelo
var Michaelangelo, Raphael, rectangle;

Michaelangelo = require('michaelangelo');
Raphael = require('raphael');

rectangle = Michaelangelo.Rectangle({
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  {
    stroke: '#000'
  }
});

Raphael('canvas'. 400, 400, rectangle.toRaphaelObject());
```

Ok... I know what you're thinking. More lines of code... Wat?

You're right, but what if we want to scale our rectangle?
```javascript
// Raphael with Michaelangelo
var Michaelangelo, Raphael, rectangle;

Michaelangelo = require('michaelangelo');
Raphael = require('raphael');

// Creates a 20x20 rectangle
rectangle = new Michaelangelo.Rectangle({
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  {
    scale: 2,
    stroke: '#000'
  }
});

Raphael('canvas'. 400, 400, rectangle.toRaphaelObject());
```
The problem I had is that I wanted to use real measurements, then scale as needed.

Raphael provides means to scale, but you must do so after placing it on the canvas. Prior
to placing it on the canvas, I didn't want to have to deal with the mental load of keeping
track of the scale or litter ```'... * 2'``` everywhere.

While these may be syntactic improvements at best, I think some of the real powers
of Michaelangelo reside in path building.
```javascript
var Raphael;

Raphael = require('raphael');

Raphael(['canvas', 400, 400, {
  type: 'path',
  path: 'M0,0L10,10Z';
}]);
```
While this is a simple example, it's not entirely intuitive.
```javascript
var Michaelangelo, Raphael, path;

Michaelangelo = require('michaelangelo');
Raphael = require('raphael');

path = new Michaelangelo.Path({
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 10
});

Raphael('canvas'. 400, 400, path.toRaphaelObject());
```
To me, this example is much more clear of what we're doing. We have a line with two
points, Michaelangelo handles the rest.

Another handy service that Michaelangelo provides is building arcs.
```javascript
var Michaelangelo, Raphael, circle, ellipse, arc;

Michaelangelo = require('michaelangelo');
Raphael = require('raphael');

// Essentially draws a circle centered at (200, 200) with
// a radius of 25
circle = new Michaelangelo.Arc({
  cx: 200,
  cy: 200,
  height: 50,
  width: 50
});

// Similar to above, but this will be an ellipse
ellipse = new Michaelangelo.Arc({
  cx: 200,
  cy: 200,
  height: 100,
  width: 50
});

// Ok, now we're actually drawing an arc. This one will draw
// the right half of the ellipse above.
arc = new Michaelangelo.Arc({
  cx: 200,
  cy: 200,
  height: 100,
  width: 50,
  theta1: 90,
  theta2: 270
});
```

## Future Development
* Make Michaelangelo a module that can stand on it's own - currently still have to use Raphael in conjunction
* Make scale an option that you configure once for the entire canvas
* Expand the path helper functions
* Make the canvas rotate easily

## Contributing

#### Installing
```git clone git@github.com:austburn/michaelangelo.git```

```cd michaelangelo```

```npm install```

#### Run Tests and Lint
```npm test```

Feel free to fork and submit pull requests!
