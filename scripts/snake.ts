class Snake {
    current_angle: number = Math.floor( 360 * Math.random() );
    angle_delta: number = 2;
    direction: number = 0;
    speed: number = 3;
    length: number = 1000;
    distance: number = 0;
    snakeHead = new Circle(new Point(500 - Math.random() * 1000, 500 - Math.random() * 1000),8)

    new_render_circles: Array<Circle> = [];
    new_collision_circles: Array<Circle> = [];

    UpdateDirections(): void {        
        this.current_angle += this.direction * this.angle_delta;

        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360
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