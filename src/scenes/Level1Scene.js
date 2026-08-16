import Phaser from 'phaser';
import Player from '../objects/Player.js';
import Enemy from '../objects/Enemy.js';
import Tick from '../objects/Tick.js';
import Mosquito from '../objects/Mosquito.js';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    create() {
        // --- 0. HINTERGRUND ---
        this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);

        // --- 1. WELT & PLATTFORMEN ---
        this.physics.world.setBounds(0, 0, 2000, 600);
        this.platforms = this.physics.add.staticGroup();

        // Boden mit Abgründen
        const groundPositions = [150, 600, 1120, 1750];
        groundPositions.forEach(x => {
            const ground = this.platforms.create(x, 584, 'ground');
            ground.setScale(0.5).refreshBody();
        });

        // Schwebende Balken
        this.platforms.create(400, 440, 'beam').setScale(0.35).refreshBody();
        this.platforms.create(850, 340, 'beam').setScale(0.45).refreshBody();
        this.platforms.create(1350, 260, 'beam').setScale(0.35).refreshBody();
        this.platforms.create(1700, 380, 'beam').setScale(0.35).refreshBody();

        // --- 2. SPIELER ---
        this.player = new Player(this, 80, 400);
        
        this.cameras.main.setBounds(0, 0, 2000, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1.2);

        this.physics.add.collider(this.player, this.platforms);

        // --- 3. GEGNER (Muggel, Zecken & Mücken) ---
        this.enemies = this.physics.add.group({ runChildUpdate: true });

        // Muggel (Boden / Balken)
        this.enemies.add(new Enemy(this, 850, 300, 760, 1530, 140));

        // Zecken (Krabbeln auf Balken/Boden)
        this.enemies.add(new Tick(this, 370, 400, 320, 470));
        this.enemies.add(new Tick(this, 1700, 340, 1620, 1780));

        // Mücken (Fliegen in der Luft)
        this.enemies.add(new Mosquito(this, 600, 260));
        this.enemies.add(new Mosquito(this, 1250, 180));

        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.enemies, this.handleEnemyCollision, null, this);

        // --- 4. GEOCACHES ---
        this.caches = this.physics.add.group();
        
        const positions = [
            [250, 480], [400, 370], [620, 480], [850, 260], [1120, 480],
            [1350, 180], [1550, 480], [1700, 300], [1850, 480], [1950, 350]
        ];

        positions.forEach(pos => {
            const cache = this.caches.create(pos[0], pos[1], 'cache');
            cache.body.setAllowGravity(false); 
            cache.setScale(0.22);

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

        // --- 5. UI ---
        this.score = 0;
        this.scoreText = this.add.text(90, 65, 'Caches: 0 / 10', {
            fontSize: '22px',
            fill: '#000000',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 4
        });
        this.scoreText.setScrollFactor(0); 
        this.scoreText.setDepth(100);
    }

    update() {
        this.player.update();

        // Absturz in Abgrund
        if (this.player.y > 620) {
            this.scene.restart();
        }

        // Gegner im Level aktualisieren
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update) {
                enemy.update();
            }
        });

        if (this.bg) {
            this.bg.tilePositionX = this.cameras.main.scrollX * 0.3;
        }
    }

    handleEnemyCollision(player, enemy) {
        const isJumpingOnTop = player.body.velocity.y > 0 && player.y < enemy.y - 10;

        if (isJumpingOnTop) {
            player.setVelocityY(-350);

            const emitter = this.add.particles(enemy.x, enemy.y, 'spark', {
                speed: { min: 50, max: 150 },
                lifespan: 400,
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
                emitting: false 
            });
            emitter.explode(16);

            enemy.destroy();
        } else {
            this.scene.restart();
        }
    }

    // In Level1Scene.js:
collectCache(player, cache) {
    this.tweens.killTweensOf(cache);
    cache.destroy();
    
    this.score++;
    this.scoreText.setText(`Caches: ${this.score} / 10`);

    if (this.score >= 10) {
        this.add.text(400, 300, 'Glückwunsch - du hast alle Dosen im Wald gefunden. \n Jetzt geht es in die Stadt.', {
            fontSize: '20px',
            fill: '#15ff00',
            fontStyle: 'bold',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        
        this.physics.pause();

        // Nach 2 Sekunden (2000 ms) automatisch zu Level 2 wechseln
        this.time.delayedCall(5000, () => {
            this.scene.start('Level2');
        });
    }
}
    }
    
