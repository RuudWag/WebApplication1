class RenderSnake {    
    static_circles: PIXI.particles.ParticleContainer;
    center_circles: PIXI.particles.ParticleContainer;
    app: PIXI.Application;
    texture: PIXI.RenderTexture;
    boundary: PIXI.Container;
    currentindex: number = 0;

    constructor(app: PIXI.Application) {
        this.app = app;   
        this.center_circles = new PIXI.particles.ParticleContainer();
        this.static_circles = new PIXI.particles.ParticleContainer(1000000);
        this.boundary = new PIXI.Container();
        let circle = new PIXI.Graphics();
        circle.beginFill(0x9966FF);
        circle.drawCircle(0, 0, 8);
        circle.endFill();
        this.texture = this.app.renderer.generateTexture(circle);
        let sprite = new PIXI.Sprite(this.texture);
        this.center_circles.x = app.screen.width / 2;
        this.center_circles.y = app.screen.height / 2;
        this.center_circles.addChild(sprite);

        this.app.stage.addChild(this.static_circles);
        this.app.stage.addChild(this.center_circles);


        let boundaries = new PIXI.Graphics();
  
        boundaries.lineStyle(5, 0xFF0000);
        boundaries.drawRect(0, 0, 1000, 1000);
        boundaries.x -= 0;
        boundaries.y -= 0;
    
        let boundarytexture = this.app.renderer.generateTexture(boundaries);
        let boundarysprit = new PIXI.Sprite(boundarytexture);
        this.boundary.addChild(boundaries);
        // draw a rectangle
        

        this.app.stage.addChild(this.boundary)

        console.log(app.screen.width);
        console.log(app.screen.height);
    }

    UpdateRender(snake: Snake): void {
        this.static_circles.x = snake.snakeHead.center.x;
        this.static_circles.y = snake.snakeHead.center.y;
        console.log("x: " + snake.snakeHead.center.x + " y: " + snake.snakeHead.center.y);
        this.boundary.x = snake.snakeHead.center.x
        this.boundary.y = snake.snakeHead.center.y

        for (let i = 0; i < snake.new_render_circles.length; i++) {
            let x = app.screen.width / 2 - snake.new_render_circles[i].center.x
            let y = app.screen.height / 2 - snake.new_render_circles[i].center.y
            if (this.static_circles.children.length < snake.length) {
                let sprite = new PIXI.Sprite(this.texture);
                sprite.x = x;
                sprite.y = y;
                this.static_circles.addChild(sprite);
            }
            else {
                if (snake.length <= this.currentindex) {
                    this.currentindex = 0;
                }
                let change_sprite = this.static_circles.getChildAt(this.currentindex)
                change_sprite.x = x;
                change_sprite.y = y;
            }
            this.currentindex++;
        }
        snake.new_render_circles = [];
    }
}

