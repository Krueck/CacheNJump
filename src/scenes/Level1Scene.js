import Phaser from 'phaser';
import Player from '../objects/Player.js';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    create() {
        // --- 1. WELT & PLATTFORMEN ---
        this.physics.world.setBounds(0, 0, 2000, 600);
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 5; i++) {
            this.platforms.create(200 + (i * 400), 584, 'platform');
        }

        this.platforms.create(500, 450, 'platform').setScale(0.5, 1).refreshBody();
        this.platforms.create(900, 350, 'platform').setScale(0.3, 1).refreshBody();
        this.platforms.create(1300, 250, 'platform').setScale(0.5, 1).refreshBody();

        // --- 2. SPIELER ---
        this.player = new Player(this, 100, 400);
        
        this.cameras.main.setBounds(0, 0, 2000, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1.2);

        this.physics.add.collider(this.player, this.platforms);

        // --- 3. GEOCACHES ---
        this.caches = this.physics.add.group();
        
        // Echte "Koordinaten" im Level
        const positions = [
            [300, 500], [500, 400], [900, 300], [1300, 200], [1600, 500],
            [1850, 450], [1100, 500], [700, 500], [1400, 500], [1950, 350]
        ];

        positions.forEach(pos => {
            const cache = this.caches.create(pos[0], pos[1], 'cache');
            cache.body.setAllowGravity(false); // Caches fallen nicht runter
        });

        // Schwebende Animation (Tween)
        this.tweens.add({
            targets: this.caches.getChildren(),
            y: '-=8', // Bewege sie 8 Pixel nach oben...
            duration: 700,
            yoyo: true, // ...und wieder zurück
            repeat: -1, // Endlos wiederholen
            ease: 'Sine.easeInOut'
        });

        // Kollisionsabfrage: Spieler berührt Cache (overlap, nicht collider, damit man nicht dran hängen bleibt)
        this.physics.add.overlap(this.player, this.caches, this.collectCache, null, this);

        // --- 4. UI (PUNKTESTAND) ---
        this.score = 0;
        this.scoreText = this.add.text(20, 20, 'Caches: 0 / 10', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });
        // WICHTIG: Text bewegt sich nicht mit der Kamera mit!
        this.scoreText.setScrollFactor(0); 
    }

    update() {
        this.player.update();
    }

// --- 5. EINSAMMELN-LOGIK ---
    collectCache(player, cache) {
        // 1. Partikeleffekt erzeugen
        const emitter = this.add.particles(cache.x, cache.y, 'spark', {
            speed: { min: 50, max: 150 }, // Fliegen unterschiedlich schnell
            lifespan: 400,                // Leben für 400 Millisekunden
            scale: { start: 0.4, end: 0 },// Werden immer kleiner
            blendMode: 'ADD',             // Leucht-Effekt
            emitting: false               // Nicht dauerhaft sprühen...
        });
        
        // ...sondern genau jetzt 16 Partikel explodieren lassen!
        emitter.explode(16);

        // 2. Cache verschwindet
        cache.destroy();
        
        // 3. Punkte hochzählen
        this.score++;
        this.scoreText.setText(`Caches: ${this.score} / 10`);

        // 4. Gewinnbedingung prüfen
        if (this.score >= 10) {
            this.add.text(400, 300, 'LEVEL GESCHAFFT!', {
                fontSize: '40px',
                fill: '#00ff00',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setScrollFactor(0);
            
            this.physics.pause();
        }
    }
}