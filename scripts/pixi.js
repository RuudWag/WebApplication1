/// <reference path="../typings/pixi.js.d.ts" />
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
function setup() {
    //Create the cat sprite
    cat = new Sprite(resources["images/cat.png"].texture);
    cat.y = 96;
    //Add the cat to the stage
    app.stage.addChild(cat);
    app.ticker.add(delta => gameLoop(delta));
}
let i = 1;
function gameLoop(delta) {
    for (var i = app.stage.children.length - 1; i >= 0; i--) {
        app.stage.getChildAt(i).x += delta;
    }
    let catnew = new Sprite(resources["images/cat.png"].texture);
    catnew.y = i;
    i = i + 1;
    app.stage.addChild(catnew);
    //Move the cat 1 pixel 
    cat.x += delta;
    //Optionally use the `delta` value
    //cat.x += 1 + delta;
}
//# sourceMappingURL=pixi.js.map