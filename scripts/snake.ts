class Snake {
    public current_angle: number;
    public angle_delta: number;
    public direction: number;
    public speed: number;
    public length: number;
    public vx: number;
    public vy: number
    constructor() {
        this.current_angle = Math.random();
        this.angle_delta = 2;
        this.direction = 0;
        this.speed = 1;
        this.vx = this.speed * Math.sin((this.current_angle + 90) * Math.PI / 180);
        this.vy = this.speed * Math.sin(this.current_angle * Math.PI / 180);
        this.length = 100;
    }
    UpdateDirections() : void {
        this.current_angle += this.direction * this.angle_delta;

        if (this.current_angle > 360) {
            this.current_angle -= 360;
        }
        if (this.current_angle < 0) {
            this.current_angle += 360
        }

        this.vx = this.speed * Math.sin((this.current_angle + 90) * Math.PI / 180);

        this.vy = this.speed * Math.sin(this.current_angle * Math.PI / 180);
    }

}