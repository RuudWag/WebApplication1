class BodyParts {
    new_circle: Circle = null;
    old_circle: Circle = null;
    not_to_check_against: Array<number> = [];
    constructor(circle: Circle, own_index) {
        //this.snakeHead = new Circle(new Point(squareBase.center.x + squareBase.halfDimension * (Math.random() - 0.5), squareBase.center.y + squareBase.halfDimension * (Math.random() - 0.5)), 8);        
        this.new_circle = circle;
        if (circle) {
            this.not_to_check_against.push(own_index)
        }
    }
}

class Snake {
    current_angle: number = Math.floor( 225 );
    angle_delta: number = 1;
    direction: number = 0;
    speed: number = 5;
    length: number = 1000;
    distance: number = 0;
    snakeHead: Circle;
    last_circle: Circle;
    body: Array<BodyParts> = [];
    distance_between_parts: number = 5;
    bodies_for_collision: Array<number> = [];
    bodies_to_render: Array<number> = [];
    oldest_bodypart: number = 0;
    new_render_circles: Array<Circle> = [];
    new_collision_circles: Array<Circle> = [];
    jump: boolean = false;

    constructor(squareBase: square) {
        //this.snakeHead = new Circle(new Point(squareBase.center.x + squareBase.halfDimension * (Math.random() - 0.5), squareBase.center.y + squareBase.halfDimension * (Math.random() - 0.5)), 8);
        this.snakeHead = new Circle(new Point(8, 8), 8);
        this.last_circle = new Circle(new Point(8, 8), 8);
    }
    AddBodyPart(new_body_part: Circle): void {
       
        let body_part = this.body[this.oldest_bodypart]
        if (body_part == undefined) {
            this.body.push(new BodyParts(new_body_part, this.oldest_bodypart))
            body_part = this.body[this.oldest_bodypart]
        }
        else {
            body_part.old_circle = body_part.new_circle;
            body_part.new_circle = new_body_part;
            body_part.not_to_check_against = []
            if (new_body_part) {
                body_part.not_to_check_against.push(this.oldest_bodypart)
            }
        }
        let previous_body_part = this.oldest_bodypart - 1;
        if (previous_body_part < 0) {
            previous_body_part = this.length - 1;
        }

        if (this.body[previous_body_part] != undefined && new_body_part) {
            for (let i = 0; i < this.body[previous_body_part].not_to_check_against.length; i++) {
                if (body_part.new_circle.insertsectsWithCircle(this.body[this.body[previous_body_part].not_to_check_against[i]].new_circle)) {
                    body_part.not_to_check_against.push(this.body[previous_body_part].not_to_check_against[i]);
                }
            }
        }

        this.bodies_for_collision.push(this.oldest_bodypart);
        this.bodies_to_render.push(this.oldest_bodypart);
        
        this.oldest_bodypart += 1;
        if (this.oldest_bodypart >= this.length) {
            this.oldest_bodypart = 0;
        }
    }

    UpdateDirections(delta: number): void {   
        let old_angle = this.current_angle;
        this.current_angle += this.direction * this.angle_delta * delta*this.speed;

        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360
        }
        let left_over_last_frame = this.distance;
        let distance_this_frame = this.speed * delta;


        this.distance += distance_this_frame

        let number_of_new_circles = Math.floor(this.distance/this.distance_between_parts)

        for (let i = 0; i < number_of_new_circles; i++) {
            let new_circle : Circle = undefined
            if (!this.jump) {

                if (i == 0) {
                    this.last_circle.center.x = this.snakeHead.center.x - Math.sin((this.current_angle + 90) * Math.PI / 180) * (this.distance_between_parts - left_over_last_frame);
                    this.last_circle.center.y = this.snakeHead.center.y - Math.sin(this.current_angle * Math.PI / 180) * (this.distance_between_parts - left_over_last_frame);
                }
                else {
                    this.last_circle.center.x -= Math.sin((this.current_angle + 90) * Math.PI / 180) * this.distance_between_parts;
                    this.last_circle.center.y -= Math.sin(this.current_angle * Math.PI / 180) * this.distance_between_parts;
                }

                new_circle = new Circle(new Point(this.last_circle.center.x, this.last_circle.center.y), 8);
                this.new_render_circles.push(new_circle);
                this.new_collision_circles.push(new_circle);
            }
            this.AddBodyPart(new_circle);
        }
        this.snakeHead.center.x -= Math.sin((this.current_angle + 90) * Math.PI / 180) * distance_this_frame;
        this.snakeHead.center.y -= Math.sin(this.current_angle * Math.PI / 180) * distance_this_frame;

        this.distance -= number_of_new_circles * this.distance_between_parts    
    }
}