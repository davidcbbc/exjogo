export default class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload() {
        this.load.spritesheet("bird", "assets/bird.png", {
            frameWidth: 34,
            frameHeight: 24,
        });
        this.load.spritesheet("enemy", "assets/enemies.png", {
            frameWidth: 96,
            frameHeight: 96,
        });

        this.load.image("bg", "assets/background.png");

        this.load.image("bullet", "assets/bullet.png");
    }
    create() {
        this.scene.start("PlayGame");
    }
}