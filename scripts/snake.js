class BodyParts {
    constructor(circle, own_index) {
        this.new_circle = null;
        this.old_circle = null;
        this.not_to_check_against = [];
        //this.snakeHead = new Circle(new Point(squareBase.center.x + squareBase.halfDimension * (Math.random() - 0.5), squareBase.center.y + squareBase.halfDimension * (Math.random() - 0.5)), 8);        
        this.new_circle = circle;
        if (circle) {
            this.not_to_check_against.push(own_index);
        }
    }
}
class Snake {
    constructor(squareBase) {
        this.current_angle = Math.floor(225);
        this.angle_delta = 1;
        this.direction = 0;
        this.speed = 5;
        this.length = 1000;
        this.distance = 0;
        this.body = [];
        this.distance_between_parts = 5;
        this.bodies_for_collision = [];
        this.bodies_to_render = [];
        this.oldest_bodypart = 0;
        this.new_render_circles = [];
        this.new_collision_circles = [];
        this.jump = false;
        //this.snakeHead = new Circle(new Point(squareBase.center.x + squareBase.halfDimension * (Math.random() - 0.5), squareBase.center.y + squareBase.halfDimension * (Math.random() - 0.5)), 8);
        this.snakeHead = new Circle(new Point(8, 8), 8);
        this.last_circle = new Circle(new Point(8, 8), 8);
    }
    AddBodyPart(new_body_part) {
        let body_part = this.body[this.oldest_bodypart];
        if (body_part == undefined) {
            this.body.push(new BodyParts(new_body_part, this.oldest_bodypart));
            body_part = this.body[this.oldest_bodypart];
        }
        else {
            body_part.old_circle = body_part.new_circle;
            body_part.new_circle = new_body_part;
            body_part.not_to_check_against = [];
            if (new_body_part) {
                body_part.not_to_check_against.push(this.oldest_bodypart);
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
    UpdateDirections(delta) {
        let old_angle = this.current_angle;
        this.current_angle += this.direction * this.angle_delta * delta * this.speed;
        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360;
        }
        let left_over_last_frame = this.distance;
        let distance_this_frame = this.speed * delta;
        this.distance += distance_this_frame;
        let number_of_new_circles = Math.floor(this.distance / this.distance_between_parts);
        for (let i = 0; i < number_of_new_circles; i++) {
            let new_circle = undefined;
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
        this.distance -= number_of_new_circles * this.distance_between_parts;
    }
}
//# sourceMappingURL=snake.js.map