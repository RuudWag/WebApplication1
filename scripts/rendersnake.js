class RenderSnake {
    constructor(app, square_base) {
        this.currentindex = 0;
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
        circle.beginFill(0xFF66FF);
        circle.drawCircle(0, 0, 8);
        circle.endFill();
        let texture = this.app.renderer.generateTexture(circle);
        let sprite2 = new PIXI.Sprite(texture);
        this.center_circles.addChild(sprite);
        this.app.stage.addChild(this.static_circles);
        this.app.stage.addChild(this.center_circles);
        let boundaries = new PIXI.Graphics();
        boundaries.lineStyle(5, 0xFF0000);
        boundaries.drawRect(0, 0, square_base.halfDimension * 2, square_base.halfDimension * 2);
        this.boundary.addChild(boundaries);
        //boundaries.x += this.getX( square_base.halfDimension * 2 )
        //boundaries.y += this.getY( square_base.halfDimension * 2 )
        let circlenew = new PIXI.Graphics();
        circlenew.beginFill(0x9966FF);
        circlenew.drawCircle(30, 170, 16);
        circlenew.endFill();
        this.boundary.addChild(circlenew);
        //boundarysprit.x -= square_base.center.x
        //boundarysprit.y -= square_base.center.y
        //this.boundary.x = square_base.center.x - 1000000
        //this.boundary.y = square_base.center.y - 1000000
        // draw a rectangle
        this.app.stage.addChild(this.boundary);
        console.log(app.screen.width);
        console.log(app.screen.height);
    }
    getX(xCoordinate) {
        return this.app.screen.width / 2 - xCoordinate;
    }
    getY(yCoordinate) {
        return this.app.screen.height / 2 - yCoordinate;
    }
    UpdateRender(snake) {
        this.app.stage.x = this.getX(snake.snakeHead.center.x);
        this.app.stage.y = this.getY(snake.snakeHead.center.y);
        this.center_circles.x = snake.snakeHead.center.x;
        this.center_circles.y = snake.snakeHead.center.y;
        for (let i = 0; i < snake.bodies_to_render.length; i++) {
            let snake_body = snake.body[snake.bodies_to_render[i]].new_circle;
            let x = 0;
            let y = 0;
            let visible;
            if (snake_body) {
                x = snake_body.center.x;
                y = snake_body.center.y;
                visible = true;
            }
            else {
                visible = false;
            }
            if (this.static_circles.children.length < snake.length) {
                let sprite = new PIXI.Sprite(this.texture);
                sprite.x = x;
                sprite.y = y;
                sprite.visible = visible;
                this.static_circles.addChild(sprite);
            }
            else {
                if (snake.length <= this.currentindex) {
                    this.currentindex = 0;
                }
                let change_sprite = this.static_circles.getChildAt(this.currentindex);
                change_sprite.x = x;
                change_sprite.y = y;
                change_sprite.visible = visible;
            }
            this.currentindex++;
        }
        snake.new_render_circles = [];
    }
}
//# sourceMappingURL=rendersnake.js.map