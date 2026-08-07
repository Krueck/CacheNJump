import Phaser from 'phaser';
import Player from '../objects/Player.js';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    create() {
        // --- 0. HINTERGRUND ---
        const bg = this.add.image(400, 300, 'bg');
        bg.setScrollFactor(0);
        bg.setDisplaySize(800, 600);

        // --- 1. WELT & PLATTFORMEN ---
        this.physics.world.setBounds(0, 0, 2000, 600);
        this.platforms = this.physics.add.staticGroup();

        // Boden
        for (let i = 0; i < 6; i++) {
            const ground = this.platforms.create(200 + (i * 350), 584, 'ground');
            ground.setScale(0.5).refreshBody();
        }

        // Schwebende Balken
        this.platforms.create(500, 450, 'beam').setScale(0.4).refreshBody();
        this.platforms.create(900, 350, 'beam').setScale(0.4).refreshBody();
        this.platforms.create(1300, 250, 'beam').setScale(0.4).refreshBody();

        // --- 2. SPIELER ---
        this.player = new Player(this, 100, 400);
        
        this.cameras.main.setBounds(0, 0, 2000, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1.2);

        this.physics.add.collider(this.player, this.platforms);

        // --- 3. GEOCACHES (Einzeln animiert) ---
        this.caches = this.physics.add.group();
        
        const positions = [
            [300, 500], [500, 380], [900, 280], [1300, 180], [1600, 500],
            [1850, 450], [1100, 500], [700, 500], [1400, 500], [1950, 350]
        ];

        positions.forEach(pos => {
            const cache = this.caches.create(pos[0], pos[1], 'cache');
            cache.body.setAllowGravity(false); 
            cache.setScale(0.15);

            // Eigene Animation pro Cache
            this.tweens.add({
                targets: cache,
                y: pos[1] - 8, 
                duration: 700 + Math.random() * 200,
                yoyo: true, 
                repeat: -1, 
                ease: 'Sine.easeInOut'
            });
        });

        this.physics.add.overlap(this.player, this.caches, this.collectCache, null, this);

        // --- 4. UI ---
        this.score = 0;
        this.scoreText = this.add.text(20, 20, 'Caches: 0 / 10', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });
        this.scoreText.setScrollFactor(0); 
    }

    update() {
        this.player.update();
    }

    collectCache(player, cache) {
        // Einzelne Schwebe-Animation vor dem Entfernen beenden
        this.tweens.killTweensOf(cache);

        const emitter = this.add.particles(cache.x, cache.y, 'spark', {
            speed: { min: 50, max: 150 },
            lifespan: 400,
            scale: { start: 0.4, end: 0 },
            blendMode: 'ADD',
            emitting: false 
        });
        
        emitter.explode(16);

        cache.destroy();
        
        this.score++;
        this.scoreText.setText(`Caches: ${this.score} / 10`);

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