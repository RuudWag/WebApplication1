class RenderSnake {
    moving_circle: PIXI.particles.ParticleContainer;
    static_circles: PIXI.particles.ParticleContainer;
    app: PIXI.Application;

    texture: PIXI.RenderTexture;

    prevpointx: number;
    prevpointy: number;
    currentindex: number;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.moving_circle = new PIXI.particles.ParticleContainer();
        this.static_circles = new PIXI.particles.ParticleContainer(1000000);

        let circle = new PIXI.Graphics();
        circle.beginFill(0x9966FF);
        circle.drawCircle(0, 0, 8);
        circle.endFill();
        this.texture = this.app.renderer.generateTexture(circle);
        let sprite = new PIXI.Sprite(this.texture);
        this.moving_circle.x = 500;
        this.moving_circle.y = 500;
        this.moving_circle.addChild(sprite);
        /*let sprite2 = new PIXI.Sprite(this.texture);
        this.static_circles.x = 500;
        this.static_circles.y = 500;
        this.static_circles.addChild(sprite2);*/
        this.app.stage.addChild(this.moving_circle);
        this.app.stage.addChild(this.static_circles);

        this.prevpointx = 0;
        this.prevpointy = 0;
        this.currentindex = 0;
    }

    UpdateRender( snake: Snake): void {
        this.static_circles.x += snake.vx;
        this.static_circles.y += snake.vy;
        
        this.prevpointx += snake.vx;
        this.prevpointy += snake.vy;

        if (Math.sqrt((this.prevpointx * this.prevpointx) + (this.prevpointy * this.prevpointy)) >= 2) {
            if (this.static_circles.children.length <= snake.length) {
                let sprite = new PIXI.Sprite(this.texture);
                sprite.x = 500 - this.static_circles.x;
                sprite.y = 500 - this.static_circles.y;
                this.static_circles.addChild(sprite);
                
            }
            else {
                if (snake.length <= this.currentindex) {
                    this.currentindex = 0;
                }
                this.static_circles.getChildAt(this.currentindex).x = 500 - this.static_circles.x;
                this.static_circles.getChildAt(this.currentindex).y = 500 - this.static_circles.y;               
            }
            this.prevpointx = 0;
            this.prevpointy = 0;
            this.currentindex++;
        }
    }
}