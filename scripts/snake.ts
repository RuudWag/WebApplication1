class Snake {
    public current_angle: number = Math.floor( 360 + Math.random() );
    public angle_delta: number = 2;
    public direction: number = 0;
    public speed: number = 3;
    public length: number = 10;
    public x: number = Math.random() * 500;
    public y: number = Math.random() * 500;

    UpdateDirections() : void {
        this.current_angle += this.direction * this.angle_delta;

        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360
        }

        this.x += this.speed * Math.sin((this.current_angle + 90) * Math.PI / 180);

        this.y += this.speed * Math.sin(this.current_angle * Math.PI / 180);
    }

}