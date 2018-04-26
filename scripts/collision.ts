﻿class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Circle {
    center: Point;
    radius: number;
    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }

}

class square {
    center: Point;
    halfDimension: number;
    constructor(center: Point, halfDimension: number) {
        this.center = center;
        this.halfDimension = halfDimension;
    }
    containsPoint(point: Point): boolean {
        if (this.center.x - this.halfDimension <= point.x
            && this.center.x + this.halfDimension >= point.x
            && this.center.y - this.halfDimension <= point.y
            && this.center.y + this.halfDimension >= point.y) {
            return true;
        }
        return false;    
    }
    containsCircle(circle: Circle): boolean {
        let circleDistanceX = Math.abs(circle.center.x - this.center.x);
        let circleDistanceY = Math.abs(circle.center.y - this.center.y);

        if (circleDistanceX > (this.halfDimension + circle.radius)) {
            return false;
        }
        if (circleDistanceY > (this.halfDimension + circle.radius)) {
            return false;
        }

        if (circleDistanceX <= (this.halfDimension)) {
            return true;
        }
        if (circleDistanceY <= (this.halfDimension)) {
            return true;
        }
        let cornerDistance = Math.pow(circleDistanceX - this.halfDimension,2) + Math.pow(circleDistanceY - this.halfDimension,2);

        return (cornerDistance <= Math.pow(circle.radius, 2));  
    }

}

class Quadtree {
    capacity: number;
    boundary: square;
    points: Array<Point>
    hasSubTrees: boolean

    northWest: Quadtree;
    northEast: Quadtree;
    southWest: Quadtree;
    southEast: Quadtree;

    constructor(boundary: square) {
        this.boundary = boundary;
        this.hasSubTrees = false;
        this.points = new Array<Point>();
        this.capacity = 4;
    }

    insertPoint(point: Point): boolean {
        if (!this.boundary.containsPoint(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.hasSubTrees) {
            let quarterDimension = this.boundary.halfDimension / 2;
            let x = this.boundary.center.x;
            let y = this.boundary.center.y;
            this.northWest = new Quadtree(new square(new Point(x - quarterDimension, y - quarterDimension), quarterDimension))
            this.northEast = new Quadtree(new square(new Point(x + quarterDimension, y - quarterDimension), quarterDimension))
            this.southWest = new Quadtree(new square(new Point(x - quarterDimension, y + quarterDimension), quarterDimension))
            this.southEast = new Quadtree(new square(new Point(x + quarterDimension, y + quarterDimension), quarterDimension))
            this.hasSubTrees = true;
        }

        if (this.northWest.insertPoint(point)) {
            return true;
        }
        if (this.northEast.insertPoint(point)) {
            return true;
        }
        if (this.southWest.insertPoint(point)) {
            return true;
        }
        if (this.southEast.insertPoint(point)) {
            return true;
        }


        console.log("should not be here")
    }

    haveCollision(circle: Circle): boolean {


        if (!this.boundary.containsCircle(circle) || this.points.length==0) {
            return false;
        }

        for (let point of this.points)
        {
            let distanceBetweenCircles = Math.sqrt(Math.pow(circle.center.x - point.x, 2) + Math.pow(circle.center.y - point.y, 2))
            if (distanceBetweenCircles < circle.radius * 2) {
                return true;
            }
        }
        if (this.hasSubTrees) {
            if (this.northWest.haveCollision(circle)) {
                return true;
            }
            if (this.northEast.haveCollision(circle)) {
                return true;
            }
            if (this.southWest.haveCollision(circle)) {
                return true;
            }
            if (this.southEast.haveCollision(circle)) {
                return true;
            }
        }
        return false;
    }




}