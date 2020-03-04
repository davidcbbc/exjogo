import Bullet from "../models/Bullet.js";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    update(cursors, time) {

    }


}