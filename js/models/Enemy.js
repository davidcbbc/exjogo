import Bullet from "../models/Bullet.js";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.baseVelocity = 100;
        this.scene.physics.add.overlap(this, this.scene.bird, (enemy, bird) => {
            bird.minus1Life();
            this.scene.enemies.killAndHide(this);
            this.destroy();
            console.log("hit");
        });
    }

    update(cursors, time, group) {
        this.setVelocityX(-this.baseVelocity);
        if(this.x < 0) {
            console.log(this.scene.enemies.getTotalUsed());
            this.scene.enemies.killAndHide(this);
            console.log(this.scene.enemies.getTotalUsed());
        }
    }


}