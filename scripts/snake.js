class Snake {
    constructor() {
        this.current_angle = Math.floor(360 + Math.random());
        this.angle_delta = 2;
        this.direction = 0;
        this.speed = 3;
        this.length = 10;
        this.x = Math.random() * 500;
        this.y = Math.random() * 500;
    }
    UpdateDirections() {
        this.current_angle += this.direction * this.angle_delta;
        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360;
        }
        this.x += this.speed * Math.sin((this.current_angle + 90) * Math.PI / 180);
        this.y += this.speed * Math.sin(this.current_angle * Math.PI / 180);
    }
}
//# sourceMappingURL=snake.js.map