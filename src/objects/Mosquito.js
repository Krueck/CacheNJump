import Phaser from 'phaser';

export default class Mosquito extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, minX, maxX) {
        super(scene, x, y, 'Mosquito');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.setScale(0.3);
        
        this.startY = y;
        this.minX = minX;
        this.maxX = maxX;
        this.speed = 120;
        this.direction = 1;

        // Hitbox genau anpassen
        this.body.setSize(this.width * 0.5, this.height * 0.5);
    }

    update() {
        if (this.x <= this.minX) {
            this.direction = 1;
            this.setFlipX(false);
        } else if (this.x >= this.maxX) {
            this.direction = -1;
            this.setFlipX(true);
        }

        this.setVelocityX(this.speed * this.direction);

        // Sanfte Sinus-Flugbewegung
        const targetY = this.startY + Math.sin(this.scene.time.now / 150) * 12;
        this.setY(targetY);
    }
}