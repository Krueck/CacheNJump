import Phaser from 'phaser';

export default class Tick extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, minX, maxX) {
        super(scene, x, y, 'zecke');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);

        // Sehr klein skalieren
        this.setScale(0.28); 
        
        this.minX = minX;
        this.maxX = maxX;
        this.speed = 40; // Krabbelt langsam
        this.direction = 1;

        // Hitbox auf den Körper anpassen
        const bodyWidth = this.width * 0.6;
        const bodyHeight = this.height * 0.6;
        this.body.setSize(bodyWidth, bodyHeight);
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
    }
}