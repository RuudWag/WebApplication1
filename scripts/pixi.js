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
let cats = new PIXI.particles.ParticleContainer();
let state;
function setup() {
    let xpos = 0;
    let ypos = 0;
    //Create the `cat` sprite 
    for (let i = 0; i < 10000; i++) {
        var cat;
        cat = new Sprite(resources["images/cat.png"].texture);
        cat.y = xpos;
        cat.x = ypos;
        cat.vx = 0;
        cat.vy = 0;
        cats.addChild(cat);
        if (xpos > 1000) {
            xpos = 0;
            ypos += 50;
        }
        else {
            xpos += 50;
        }
    }
    cats.vx = 0;
    cats.vy = 0;
    app.stage.addChild(cats);
    //Capture the keyboard arrow keys
    let left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40);
    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cats.vx = -5;
        cats.vy = 0;
    };
    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && cats.vy === 0) {
            cats.vx = 0;
        }
    };
    //Up
    up.press = () => {
        cats.vy = -5;
        cats.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && cats.vx === 0) {
            cats.vy = 0;
        }
    };
    //Right
    right.press = () => {
        cats.vx = 5;
        cats.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && cats.vy === 0) {
            cats.vx = 0;
        }
    };
    //Down
    down.press = () => {
        cats.vy = 5;
        cats.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && cats.vx === 0) {
            cats.vy = 0;
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
    cats.x += cats.vx;
    cats.y += cats.vy;
}
//# sourceMappingURL=pixi.js.map