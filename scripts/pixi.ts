/// <reference path="snake.ts" />
/// <reference path="../typings/pixi.js.d.ts" />
/// <reference path="keyboard.ts" />
/// <reference path="collision.ts" />

//import { Container } from "pixi.js";

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
    width: 1000,
    height: 1000,
    antialias: true,
    transparent: false,
    resolution: 1
}
);



document.body.appendChild(app.view);

let snake = new Snake()
let renderSnake = new RenderSnake(app);
new Keyboard(snake);
let pointBase = new Point(0, 0);
let squareBase = new square(pointBase, 500);
let quadTreeBase = new Quadtree(squareBase)
app.ticker.add(delta => gameLoop(delta));
loader.load(setup)





function setup() {    



   
    //Capture the keyboard arrow keys
    
    //Set the game state


    //Start the game loop 
    
}

function gameLoop(delta) {
    console.time("update");
    snake.UpdateDirections();
    console.timeEnd("update");
    console.time("collision");
    quadTreeBase.updateCollision(snake);
    console.timeEnd("collision");
    console.time("Render")
    renderSnake.UpdateRender(snake);
    console.timeEnd("Render")
}

