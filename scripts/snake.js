class Snake {
    constructor() {
        this.current_angle = Math.floor(360 * Math.random());
        this.angle_delta = 2;
        this.direction = 0;
        this.speed = 3;
        this.length = 1000;
        this.distance = 0;
        this.snakeHead = new Circle(new Point(500 - Math.random() * 1000, 500 - Math.random() * 1000), 8);
        this.new_render_circles = [];
        this.new_collision_circles = [];
    }
    UpdateDirections() {
        this.current_angle += this.direction * this.angle_delta;
        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360;
        }
        this.snakeHead.center.x += this.speed * Math.sin((this.current_angle + 90) * Math.PI / 180);
        this.snakeHead.center.y += this.speed * Math.sin(this.current_angle * Math.PI / 180);
        if (this.distance >= 1) {
            let new_circle = new Circle(new Point(this.snakeHead.center.x, this.snakeHead.center.y), 8);
            this.new_render_circles.push(new_circle);
            this.new_collision_circles.push(new_circle);
            this.distance = 0;
        }
        this.distance += 1;
    }
}
//# sourceMappingURL=snake.js.map