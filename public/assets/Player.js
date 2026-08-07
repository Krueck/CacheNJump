import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'geocacher');

        // Spieler zur Szene und Physik-Engine hinzufügen
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Physik-Eigenschaften
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setDragX(1200); // Reibung, damit er nicht rutscht
        this.setMaxVelocity(250, 700);

        // Steuerung einrichten
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        this.speed = 220;
        this.jumpSpeed = 500;
    }

    update() {
        // Seitliche Bewegung zurücksetzen
        this.setVelocityX(0);

        // Nach links
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        }
        // Nach rechts
        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
        }

        // Springen (nur wenn er den Boden berührt)
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.blocked.down) {
            this.setVelocityY(-this.jumpSpeed);
        }
    }
}