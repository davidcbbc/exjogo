import Bullet from "../models/Bullet.js";
export default class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bird");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        // Adicionar colisao contra inimigos
        this.scene.physics.add.overlap(this, this.scene.enemy, (bird, enemy) => {
            console.log("Bird hit!");

        });
        this.timeToShoot = 0;
        this.velocity = 150;
        this.bulletsMaxSize = 5;
        this.bullets = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType: Bullet
        });


        this.maxLifes = 4; // 5 vidas max ( 4 + 1)
        // add heart icons 
        this.lifesGroup = this.scene.physics.add.group({
            repeat : this.maxLifes,
            key : 'life',
            setXY: { x: 36 * (this.maxLifes + 1), y: 36, stepX: -40 },
        });
        
        this.lifesGroup.children.iterate(function(heart){
            heart.setScale(0.03);
        },this);


        this.fireRate = 250;
        
    }

    update(cursors, time) {

        this.setVelocity(0);
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;

        this.velocidadex = 0;
        this.velocidadey = 0;

        if (cursors.down.isDown && this.y < height - 20) {
            this.setVelocityY(this.velocity);
            this.velocidadey = this.velocity;
        } else if (cursors.up.isDown && this.y > 0 + 20) {
            this.setVelocityY(-this.velocity);
            this.velocidadey = -this.velocity;
        }

        if (cursors.right.isDown && this.x < width - 23) {
            this.setVelocityX(this.velocity);
            this.velocidadex = this.velocity;
        } else if (cursors.left.isDown && this.x > 0 + 23) {
            this.setVelocityX(-this.velocity);
            this.velocidadex = -this.velocity;
        }

        if (cursors.space.isDown && this.timeToShoot < time) {
            let bullet = this.bullets.getFirstDead(true, this.x, this.y);
            if (bullet) {
                bullet.fire(this.velocidadex,this.velocidadey,this.bullets);
            }
            this.timeToShoot = time + this.fireRate;
        }

        this.bullets.children.iterate(function(bullet) {
            if (bullet.isOutsideCanvas()) {
                this.bullets.killAndHide(bullet);
            }
        }, this);

    }

    // metodo que tira uma vida ao passaro ou mata-o
    minus1Life(){
        console.log(this.lifesGroup.getTotalUsed());
        if(this.lifesGroup.getTotalUsed == 0){
            //game over
        } else {
            let heartzito = this.lifesGroup.getFirstAlive();
            heartzito.active = false;
            heartzito.visible = false;
        }
        
    }

}