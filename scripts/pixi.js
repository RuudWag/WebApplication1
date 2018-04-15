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
let snakeLeft = new PIXI.particles.ParticleContainer(1000000);
let state;
let prevpointx = 500;
let prevpointy = 500;
let current_angle = 0;
let angle_delta = 5;
let NewAngle = 0;
let speed_snake = 3;
let vx = 0;
let vy = 0;
let circle = new PIXI.Graphics();
circle.beginFill(0x9966FF);
circle.drawCircle(0, 0, 8);
circle.endFill();
let texture = app.renderer.generateTexture(circle);
let texture2 = app.renderer.generateTexture(circle);
function setup() {
    let sprite = new PIXI.Sprite(texture);
    snake.x = 500;
    snake.y = 500;
    snake.addChild(sprite);
    //Create the `cat` sprite 
    let sprite2 = new PIXI.Sprite(texture);
    snakeLeft.x = 500;
    snakeLeft.y = 500;
    snakeLeft.addChild(sprite2);
    app.stage.addChild(snake);
    app.stage.addChild(snakeLeft);
    //Capture the keyboard arrow keys
    let left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40);
    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        NewAngle = -1;
    };
    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown) {
            NewAngle = 0;
        }
    };
    //Right
    right.press = () => {
        NewAngle = 1;
    };
    right.release = () => {
        if (!left.isDown) {
            NewAngle = 0;
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
    //snake.x += vx;
    //snake.y += vy
    current_angle += NewAngle * angle_delta;
    if (current_angle > 360) {
        current_angle -= 360;
    }
    if (current_angle < 0) {
        current_angle += 360;
    }
    vx = speed_snake * Math.sin((current_angle + 90) * Math.PI / 180);
    vy = speed_snake * Math.sin(current_angle * Math.PI / 180);
    let Global_x = snake.getGlobalPosition().x;
    let Global_y = snake.getGlobalPosition().y;
    snakeLeft.x += vx;
    snakeLeft.y += vy;
    prevpointx += vx;
    prevpointy += vy;
    if (Math.sqrt((prevpointx * prevpointx) + (prevpointy * prevpointy)) >= 10) {
        let sprite = new PIXI.Sprite(texture);
        sprite.x = 500 - snakeLeft.x;
        sprite.y = 500 - snakeLeft.y;
        snakeLeft.addChild(sprite);
        prevpointx = 0;
        prevpointy = 0;
    }
    if (snakeLeft.x > 1000) {
        snakeLeft.visible = false;
    }
}
//# sourceMappingURL=pixi.js.map