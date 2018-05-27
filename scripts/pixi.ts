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
let play_field_width = 4000
let play_field_height = 4000

let pointBase = new Point(play_field_width / 2, play_field_height/2);
let squareBase = new square(pointBase, Math.min(play_field_height,play_field_width)/2);

document.body.appendChild(app.view);

let snake = new Snake(squareBase)
let renderSnake = new RenderSnake(app, squareBase);
new Keyboard(snake);

let quadTreeBase = new Quadtree(squareBase,0)
app.ticker.add(delta => gameLoop(delta));
loader.load(setup)





function setup() {    



   
    //Capture the keyboard arrow keys
    
    //Set the game state


    //Start the game loop 
    
}

function gameLoop(delta) {
    if (delta > 1) {
        console.log(delta)
    }
    //console.time("update");
    snake.UpdateDirections(delta);
    //console.timeEnd("update");
    //console.time("collision");
    quadTreeBase.updateCollision(snake);
    //console.timeEnd("collision");
    //console.time("Render")
    renderSnake.UpdateRender(snake);
    //console.timeEnd("Render")
}

