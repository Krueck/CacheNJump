import Phaser from 'phaser';

export default class Mosquito extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'Mosquito') {
        super(scene, x, y, texture);

        // Zur Szene & Physik hinzufügen
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Mosquitos fliegen -> keine Schwerkraft
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        
        // WICHTIG: Verhindert, dass die Physik-Engine die Hitbox eigenständig bewegt
        this.body.moves = false;

        this.setScale(0.28); 
        
        // Hitbox anpassen und zentrieren (3. Parameter = true)
        this.body.setSize(10, 10, true);

        // Flug-Parameter
        this.startX = x;
        this.startY = y;
        this.distance = 120; // Patrouillen-Reichweite nach links/rechts
        this.speed = 50;
        this.direction = 1;  // 1 = rechts, -1 = links
        this.sineTimer = 1;  // Für den Schwebeflug (Auf-und-Ab-Bewegung)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // 1. Horizontale Patrouille
        this.x += this.speed * this.direction * (delta / 1000);

        if (this.x >= this.startX + this.distance) {
            this.direction = -1;
            this.setFlipX(false);
        } else if (this.x <= this.startX - this.distance) {
            this.direction = 1;
            this.setFlipX(true);
        }

        // 2. Vertikaler Schwebeflug (Sinus-Kurve für natürliches Insekten-Fliegen)
        this.sineTimer += delta * 0.004;
        this.y = this.startY + Math.sin(this.sineTimer) * 12;
    }

    // Wenn der Spieler die Mücke besiegt
    defeat() {
        this.destroy();
    }
}