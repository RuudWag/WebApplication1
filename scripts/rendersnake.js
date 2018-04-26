class RenderSnake {
    constructor(app) {
        this.currentindex = 0;
        this.distance = 0;
        this.app = app;
        this.center_circles = new PIXI.particles.ParticleContainer();
        this.static_circles = new PIXI.particles.ParticleContainer(1000000);
        let circle = new PIXI.Graphics();
        circle.beginFill(0x9966FF);
        circle.drawCircle(0, 0, 8);
        circle.endFill();
        this.texture = this.app.renderer.generateTexture(circle);
        let sprite = new PIXI.Sprite(this.texture);
        this.app.stage.addChild(this.static_circles);
    }
    UpdateRender(snake) {
        this.static_circles.x = snake.x;
        this.static_circles.y = snake.y;
        this.distance += 1;
        if (this.distance >= 10) {
            if (this.static_circles.children.length < snake.length) {
                let sprite = new PIXI.Sprite(this.texture);
                sprite.x = 500 - this.static_circles.x;
                sprite.y = 500 - this.static_circles.y;
                this.static_circles.addChild(sprite);
                console.time('someFunction');
                let newPoint = new Point(sprite.x, sprite.y);
                let newCircle = new Circle(newPoint, 8);
                for (let i = 0; i < 100; i++) {
                    if (quadTreeBase.haveCollision(newCircle)) {
                        snake.speed = 0.001;
                        //console.log("hit")
                    }
                }
                quadTreeBase.insertPoint(newPoint);
                console.timeEnd('someFunction');
                //console.log("x: " + sprite.x);
                //console.log("y: " + sprite.y);
            }
            else {
                if (snake.length <= this.currentindex) {
                    this.currentindex = 0;
                }
                this.static_circles.getChildAt(this.currentindex).x = 500 - this.static_circles.x;
                this.static_circles.getChildAt(this.currentindex).y = 500 - this.static_circles.y;
                console.time('someFunction');
                let newPoint = new Point(this.static_circles.x, 500 - this.static_circles.y);
                let newCircle = new Circle(newPoint, 8);
                for (let i = 0; i < 100; i++) {
                    if (quadTreeBase.haveCollision(newCircle)) {
                        snake.speed = 0.001;
                        //console.log("hit")
                    }
                }
                quadTreeBase.insertPoint(newPoint);
                console.timeEnd('someFunction');
            }
            this.distance = 0;
            this.currentindex++;
        }
    }
}
//# sourceMappingURL=rendersnake.js.map