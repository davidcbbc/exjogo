import Bird from "../models/Bird.js";
import Enemy from "../models/Enemy.js";
export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    create() {
        console.log("Starting game");
        const widht = this.game.config.width;
        const height = this.game.config.height;
        this.add.image(0, 0, "bg").setDisplayOrigin(0, 0).setDisplaySize(widht, height);
        this.bird = new Bird(this, 100, 100);
        this.enemy = new Enemy(this, 400, 400);
        this.enemy.setScale(0.5)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(this.bird, this.enemy, (bird, enemy) => {
            console.log(this);
        });
    }

    update(time, delta) {
        this.bird.update(this.cursors, time);
    }

     
}