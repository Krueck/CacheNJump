import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.15);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setDragX(1200);
        this.setMaxVelocity(250, 700);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.speed = 220;
        this.jumpSpeed = 500;

        this.currentTexture = 'player_idle';

        this.applyFixedBody('player_idle');
    }

    applyFixedBody(textureKey) {
        this.setTexture(textureKey);
        this.setOrigin(0.5, 1.0);

        // Schlanke Kollisionsbox definieren (35 % Breite, 70 % Höhe des Bildes)
        const bodyWidth = this.width * 0.35; 
        const bodyHeight = this.height * 0.70; 

        this.body.setSize(bodyWidth, bodyHeight);
        this.body.setOffset(
            (this.width - bodyWidth) / 2,
            this.height - bodyHeight
        );
    }

    changeTexture(textureKey) {
        if (this.currentTexture !== textureKey) {
            this.currentTexture = textureKey;
            this.applyFixedBody(textureKey);
        }
    }

    update() {
        this.setVelocityX(0);

        const onGround = this.body.blocked.down || this.body.touching.down;
        const movingLeft = this.cursors.left.isDown;
        const movingRight = this.cursors.right.isDown;

        // --- 1. BEWEGUNG ---
        if (movingLeft) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        } else if (movingRight) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);
        }

        // --- 2. SPRINGEN ---
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
            this.setVelocityY(-this.jumpSpeed);
        }

        // --- 3. BILDWECHSEL ---
        const isJumpingOrFalling = !onGround && Math.abs(this.body.velocity.y) > 30;

        if (isJumpingOrFalling) {
            this.changeTexture('player_jump');
        } else if (movingLeft || movingRight) {
            this.changeTexture('player_walk');
        } else {
            this.changeTexture('player_idle');
        }
    }
}