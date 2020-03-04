export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.baseVelocity = 350;
    }

    fire(x, y) {
        this.setVelocityX(x);
        this.setVelocityY(y);
    }

    fireToEnemy(enemy) {
        //const dx = enemy.x - this.x;
        //const dy = enemy.y - this.y;
        //const alpha = Math.atan2(dy, dx);
        //const vx = this.baseVelocity * Math.cos(alpha);
        //const vy = this.baseVelocity * Math.sin(alpha);
        //this.setVelocityX(vx);
        //this.setVelocityY(vy);
        // OU :
        this.scene.physics.add.overlap(this, enemy, (bird, enemy) => {
            console.log(this);
        });
        this.scene.physics.moveToObject(this, enemy, this.baseVelocity);
        this.active = true;
        this.visible = true;
    }

    isOutsideCanvas() {
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;
        return this.x > width || this.x < 0 || this.y > height || this.y < 0;
    }


}