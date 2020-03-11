export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.baseVelocity = 350;
    }

    fireInDirections(x, y, bullets) {
        this.body.gravity.set(0, 300);
        this.scene.physics.add.overlap(this, this.scene.enemies, (bullet, enemy) => {
            bullets.killAndHide(this);

            this.scene.enemies.killAndHide(enemy);
            enemy.destroy();
            this.destroy();
            console.log("hit");
        });

        if (x == 0 && y == 0) {
            // caso esteja parado dispara para a direita
            x = this.baseVelocity;
            y = 0;
        } else {
            if (x == 0) x = 0;
            else if (x > 0) x = this.baseVelocity;
            else x = -this.baseVelocity;
            if (y == 0) y = 0;
            else if (y > 0) y = this.baseVelocity;
            else y = -this.baseVelocity;
        }
        this.setVelocityX(x);
        this.setVelocityY(y);
        this.active = true;
        this.visible = true;
    }



    fire(x, bullets) {
        this.body.gravity.set(300, 300);
        this.scene.physics.add.overlap(this, this.scene.enemies, (bullet, enemy) => {
            bullets.killAndHide(this);
            this.scene.enemies.killAndHide(enemy);
            enemy.destroy();
            this.destroy();
            console.log("hit");
        });

        if (x == 0) {
            // caso esteja parado dispara para a direita
            x = this.baseVelocity;
        } else {
            if (x > 0) x = this.baseVelocity;
            else x = -this.baseVelocity;
        }
        console.log(x);
        this.setVelocityX(x);
        this.active = true;
        this.visible = true;

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
        this.scene.physics.add.overlap(this, enemy, (bullet, enemy) => {
            bullet.destroy()
            enemy.destroy();
            console.log("hit");
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