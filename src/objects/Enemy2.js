import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, minX, maxX, speed = 160) {
        super(scene, x, y, 'enemy2');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);

        this.setScale(0.13);
        
        this.minX = minX;
        this.maxX = maxX;
        this.speed = speed; // Geschwindigkeit anpassbar (Standard: 160)
        this.direction = -1;
    }

    update() {
        if (this.x <= this.minX) {
            this.direction = 1;
            this.setFlipX(true);
        } else if (this.x >= this.maxX) {
            this.direction = -1;
            this.setFlipX(false);
        }

        this.setVelocityX(this.speed * this.direction);
    }
    
}