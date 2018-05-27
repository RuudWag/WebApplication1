class Point {
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
    insertsectsWithCircle(oter_circle: Circle): boolean {
        let distanceBetweenCircles = Math.sqrt(Math.pow(this.center.x - oter_circle.center.x, 2) + Math.pow(this.center.y - oter_circle.center.y, 2))
        if (distanceBetweenCircles < this.radius + oter_circle.radius) {
            return true;
        }
    }

}

class square {
    center: Point;
    halfDimension: number;
    constructor(center: Point, halfDimension: number) {
        this.center = center;
        this.halfDimension = halfDimension;
    }
    CircleInSquare(circle: Circle): boolean {


        let radius = circle.radius;
        if (this.center.x - this.halfDimension <= circle.center.x - radius
            && this.center.x + this.halfDimension >= circle.center.x + radius
            && this.center.y - this.halfDimension <= circle.center.y - radius
            && this.center.y + this.halfDimension >= circle.center.y + radius) {
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
    circles: Array<Circle>
    hasSubTrees: boolean
    depth: number = 0;
    northWest: Quadtree;
    northEast: Quadtree;
    southWest: Quadtree;
    southEast: Quadtree;

    constructor(boundary: square, depth: number) {
        
        this.boundary = boundary;
        this.hasSubTrees = false;
        this.circles = new Array<Circle>();
        this.capacity = 4;

        this.depth = depth;
        /*if (this.depth < 300) {
            let boundaries = new PIXI.Graphics();

            boundaries.lineStyle(3, 0xFFFF00);
            boundaries.drawRect(0, 0, this.boundary.halfDimension * 2, this.boundary.halfDimension * 2);
            let multiplier = 0;
            for (let i = 0; i < this.depth; i++) {
                multiplier = multiplier * 2 + 1
            }
            boundaries.x = this.boundary.center.x - this.boundary.halfDimension;
            boundaries.y = this.boundary.center.y -this.boundary.halfDimension;
            renderSnake.boundary.addChild(boundaries);
        }*/

    }

    insertCircle(circle: Circle): boolean {
        if (!this.boundary.CircleInSquare(circle)) {
            return false;
        }

        if (this.circles.length < this.capacity) {
            this.circles.push(circle);
            return true;
        }

        if (!this.hasSubTrees) {
            let quarterDimension = this.boundary.halfDimension / 2;
            let x = this.boundary.center.x;
            let y = this.boundary.center.y;
            this.northWest = new Quadtree(new square(new Point(x - quarterDimension, y - quarterDimension), quarterDimension), this.depth+1)
            this.northEast = new Quadtree(new square(new Point(x + quarterDimension, y - quarterDimension), quarterDimension), this.depth + 1)
            this.southWest = new Quadtree(new square(new Point(x - quarterDimension, y + quarterDimension), quarterDimension), this.depth + 1)
            this.southEast = new Quadtree(new square(new Point(x + quarterDimension, y + quarterDimension), quarterDimension), this.depth + 1)
            this.hasSubTrees = true;
        }

        if (this.northWest.insertCircle(circle)) {
            return true;
        }
        if (this.northEast.insertCircle(circle)) {
            return true;
        }
        if (this.southWest.insertCircle(circle)) {
            return true;
        }
        if (this.southEast.insertCircle(circle)) {
            return true;
        }

        this.circles.push(circle);
        return true;
    }

    removepoint(circle: Circle): boolean {
        if (!this.boundary.containsCircle(circle)) {
            return false;
        }

        for (let i = 0; i < this.circles.length; i++) {
            if (circle.center.x == this.circles[i].center.x && circle.center.y == this.circles[i].center.y) {
                this.circles.splice(i, 1);
                return true;
            }
        }

        if (this.hasSubTrees) {
            if (this.northWest.removepoint(circle)) {
                return true;
            }
            if (this.northEast.removepoint(circle)) {
                return true;
            }
            if (this.southWest.removepoint(circle)) {
                return true;
            }
            if (this.southEast.removepoint(circle)) {
                return true;
            }
        }
    }

    haveCollision(check_circle: Circle, collision_circles: Array<Circle>): void {


        if (!this.boundary.containsCircle(check_circle) ) {
            return;
        }

        for (let circle of this.circles)
        {
            let distanceBetweenCircles = Math.sqrt(Math.pow(check_circle.center.x - circle.center.x, 2) + Math.pow(check_circle.center.y - circle.center.y, 2))
            if (distanceBetweenCircles < check_circle.radius + circle.radius) {
                collision_circles.push(circle);
            }
        }
        if (this.hasSubTrees) {
            this.northWest.haveCollision(check_circle, collision_circles)
             
            this.northEast.haveCollision(check_circle, collision_circles)
            
            this.southWest.haveCollision(check_circle, collision_circles)
             
            this.southEast.haveCollision(check_circle, collision_circles)               
        }
    }

    updateCollision(snake: Snake) { 

        for (let i = 0; i < snake.bodies_for_collision.length; i++) {
            let snake_body = snake.body[snake.bodies_for_collision[i]];
            if (snake_body.old_circle) {
                if (!quadTreeBase.removepoint(snake_body.old_circle)) {
                    console.log("removing failed, should not happen");
                }
            }
            if (snake_body.new_circle) {
                quadTreeBase.insertCircle(snake_body.new_circle);

                let collision_points: Array<Circle> = [];
                quadTreeBase.haveCollision(snake_body.new_circle, collision_points)
                if (collision_points.length != snake_body.not_to_check_against.length) {
                    snake.speed = 1;
                }
            }
        }
        snake.bodies_for_collision=[]

        /*snake.bodies_for_collision = [];
        let collision_points : Array<Circle> = [];
        quadTreeBase.haveCollision(snake.snakeHead, collision_points) 
        if (collision_points.length != snake.bodies_not_check_for_collision.length) {
            snake.speed = 1;
        }*/
        
     
    }




}