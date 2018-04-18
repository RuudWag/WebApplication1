/// <reference path="snake.ts" />
class Key {
    constructor(keycode) {
        this.code = keycode;
        this.isDown = false;
        this.isUp = true;
        this.downHandler = event => {
            if (event.keyCode === this.code) {
                if (this.isUp && this.press)
                    this.press();
                this.isDown = true;
                this.isUp = false;
            }
            event.preventDefault();
        };
        //The `upHandler`
        this.upHandler = event => {
            if (event.keyCode === this.code) {
                if (this.isDown && this.release)
                    this.release();
                this.isDown = false;
                this.isUp = true;
            }
            event.preventDefault();
        };
        //Attach event listeners
        window.addEventListener("keydown", this.downHandler.bind(this), false);
        window.addEventListener("keyup", this.upHandler.bind(this), false);
    }
}
class Keyboard {
    constructor(snake) {
        this.left = new Key(37);
        this.right = new Key(39);
        //Left 
        this.left.press = () => {
            snake.direction = -1;
        };
        this.left.release = () => {
            if (!this.right.isDown) {
                snake.direction = 0;
            }
        };
        //Right
        this.right.press = () => {
            snake.direction = 1;
        };
        this.right.release = () => {
            if (!this.left.isDown) {
                snake.direction = 0;
            }
        };
    }
}
//# sourceMappingURL=keyboard.js.map