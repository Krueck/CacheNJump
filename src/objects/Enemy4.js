import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, minX, maxX, speed = 0) {
        super(scene, x, y, 'enemy4');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);

        this.setScale(0.05);
        
        this.minX = minX;
        this.maxX = maxX;
        this.speed = speed; // Geschwindigkeit anpassbar (Standard: 160)
        this.direction = -1;
    }


    }
    
