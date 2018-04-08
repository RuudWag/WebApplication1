/// <reference path="../typings/pixi.js.d.ts" />
//import { Container } from "pixi.js";
//Aliases
let Application = PIXI.Application, loader = PIXI.loader, resources = PIXI.loader.resources, Sprite = PIXI.Sprite;
//Create a Pixi Application
let app = new Application({
    width: 1000,
    height: 1000,
    antialias: true,
    transparent: false,
    resolution: 1
});
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//load an image and run the `setup` function when it's done
loader
    .add("images/cat.png")
    .load(setup);
//This `setup` function will run when the image has loaded
var cat;
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press)
                key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release)
                key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
//Define any variables that are used in more than one function
let snake = new PIXI.particles.ParticleContainer();
let snakeLeft = new PIXI.particles.ParticleContainer();
let state;
let prevpointx = 500;
let prevpointy = 500;
let circle = new PIXI.Graphics();
circle.beginFill(0x9966FF);
circle.drawCircle(0, 0, 32);
circle.endFill();
let texture = app.renderer.generateTexture(circle);
function setup() {
    let xpos = 0;
    let ypos = 0;
    let sprite = new PIXI.Sprite(texture);
    sprite.x = 500;
    sprite.y = 500;
    snake.addChild(sprite);
    //Create the `cat` sprite 
    snake.vx = 0;
    snake.vy = 0;
    app.stage.addChild(snake);
    //Capture the keyboard arrow keys
    let left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40);
    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        snake.vx = -5;
        snake.vy = 0;
    };
    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && snake.vy === 0) {
            snake.vx = 0;
        }
    };
    //Up
    up.press = () => {
        snake.vy = -5;
        snake.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && snake.vx === 0) {
            snake.vy = 0;
        }
    };
    //Right
    right.press = () => {
        snake.vx = 5;
        snake.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && snake.vy === 0) {
            snake.vx = 0;
        }
    };
    //Down
    down.press = () => {
        snake.vy = 5;
        snake.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && snake.vx === 0) {
            snake.vy = 0;
        }
    };
    //Set the game state
    state = play;
    //Start the game loop 
    app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
    //Update the current game state:
    state(delta);
}
function play(delta) {
    //Use the cat's velocity to make it move
    snake.x += snake.vx;
    snake.y += snake.vy;
    if (Math.sqrt((snake.x - prevpointx) * (snake.x - prevpointx) + (snake.y - prevpointy) * (snake.y - prevpointy)) >= 32) {
        let sprite = new PIXI.Sprite(texture);
        sprite.x = snake.x;
        sprite.y = snake.y;
        snakeLeft.addChild(sprite);
        prevpointx = snake.x;
        prevpointy = snake.y;
    }
}
//# sourceMappingURL=pixi.js.map