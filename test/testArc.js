var Arc, assert;

assert = require('assert');
sinon = require('sinon');
Arc = require('../lib/arc');

describe('arc', function () {
    it('validateAttributes does not throw exception for accepted attributes', function () {
        var arc;
        arc = new Arc({cx: 2, cy: 2, width: 3, height: 1});
        assert.doesNotThrow(function () {
            arc.validateAttributes();
        });
    });

    it('toRaphaelObject adds type and calculates path', function () {
        var arc, raphaelObj;
        arc = new Arc({cx: 2, cy: 2, width: 2, height: 2});

        arc.calculatePointOnEclipse = sinon.stub();
        arc.calculatePointOnEclipse.onFirstCall().returns({x: 1, y: 2});
        arc.calculatePointOnEclipse.onSecondCall().returns({x: 2, y: 3});

        raphaelObj = arc.toRaphaelObject();

        assert.deepEqual(raphaelObj, {
            type: 'path',
            path: 'M1,2A1,1 0 0,1 2,3'
        });
    });

    describe('helpers', function () {
        var arc;

        beforeEach(function () {
            arc = new Arc({});
        });

        it('converts degrees to radians correctly', function () {
            // sin(30) == 0.5
            var radians;
            radians = Math.sin(arc.degreesToRadians(30)).toPrecision(2);

            assert.equal(radians, 0.5);
        })

        it('calculates the point correctly when the start point is 0', function () {
            var point;

            point = arc.calculatePointOnEclipse(2, 2, 1, 1, 0);

            assert.deepEqual(point, {x: 1, y: 2});
        });

        it('calculates the point correctly when the start point is 30', function () {
            var point;

            point = arc.calculatePointOnEclipse(2, 2, 1, 1, 30);

            // cos(30) == 0.866025
            // sin(30) == 0.5
            assert.equal(point.x.toPrecision(4), 2 - 0.866);
            assert.equal(point.y, 2.5);
        });

        it('calculates the point correctly when the start point is 45', function () {
            var point;

            point = arc.calculatePointOnEclipse(2, 2, 1, 1, 45);

            // cos(45) == sin(45) == 0.7071
            assert.equal(point.x.toPrecision(5), 2 - 0.7071);
            assert.equal(point.y.toPrecision(5), 2 + 0.7071);
        });

        it('calculates the point correctly when the start point is 60', function () {
            var point;

            point = arc.calculatePointOnEclipse(2, 2, 1, 1, 60);

            // cos(45) == 0.5
            // sin(45) == 0.866025
            assert.equal(point.x, 1.5);
            assert.equal(point.y.toPrecision(4), 2 + 0.866);
        });
    });
});
