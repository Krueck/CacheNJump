import Phaser from 'phaser';
import Player from '../objects/Player.js';
import Enemy from '../objects/Enemy.js';
import Enemy2 from '../objects/Enemy2.js';
import Enemy3 from '../objects/Enemy3.js';
import Enemy4 from '../objects/Enemy4.js';
import Tick from '../objects/Tick.js';
import Mosquito from '../objects/Mosquito.js';

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super('Level2'); // Eindeutiger Name für die Szene
    }

    preload() {
        this.load.image('bgStadt', 'assets/Stadt.png');
    }

    create() {
        // --- 0. HINTERGRUND ---
// --- 0. HINTERGRUND ---
        // Erstelle das TileSprite mit den exakten Maßen deines Hintergrundbildes (z.B. 800x600)
        this.bg = this.add.tileSprite(0, 0, 800, 600, 'bgStadt');
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);
this.cameras.main.setZoom(1.4);
        // Falls das Bild skaliert werden muss, nutze setDisplaySize statt setTileScale:
        this.bg.setDisplaySize(800, 600);
        // --- 1. WELT & PLATTFORMEN ---
this.physics.world.setBounds(0, 0, 2500, 600);
        this.platforms = this.physics.add.staticGroup();

        // --- 2. SPIELER ---
        this.player = new Player(this, 80, 400);
        this.cameras.main.setBounds(0, 0, 2500, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(1.0);
        this.player.setScale(1.3);
        this.physics.add.collider(this.player, this.platforms);

        // --- 3. GEGNER ---
        this.enemies = this.add.group();
        
        this.enemies.add(new Enemy(this, 750, 510, 650, 850, 160));
        this.enemies.add(new Enemy2(this, 1200, 510, 950, 1450, 280));
        this.enemies.add(new Enemy3(this, 1650, 510, 1200, 2200, 120));
        
        // Kackehaufen
        this.enemies.add(new Enemy4(this, 150, 510, 650, 850, 160));
        this.enemies.add(new Enemy4(this, 550, 510, 650, 850, 160));
        this.enemies.add(new Enemy4(this, 2100, 530, 1980, 2220, 160));
        this.enemies.add(new Enemy4(this, 1700, 330, 1630, 1770));
// 💡 ALLE GEGNER AUF EINMAL VERGRÖSSERN (z. B. 1.5-fache Größe)
this.enemies.getChildren().forEach(enemy => {
    // Bei Sprites mit bereits eigener Skalierung (wie Mosquito) skaliert es relativ auf
    enemy.setScale(enemy.scaleX * 1.9, enemy.scaleY * 1.9);
});
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.enemies, this.handleEnemyCollision, null, this);

        // --- 4. GEOCACHES ---
        this.caches = this.physics.add.group();
        const positions = [
            [300, 570], [500, 570], [950, 570], [1150, 570], [1400, 570],
            [1790, 570], [1990, 570], [2190, 570], [2290, 570], [2400, 570]
        ];

        positions.forEach(pos => {
            const cache = this.caches.create(pos[0], pos[1], 'cache');
            cache.body.setAllowGravity(false);
            cache.setScale(0.32);

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
        this.scoreText = this.add.text(90, 65, 'Level 2 - Caches: 0 / 10', {
            fontSize: '22px',
            fill: '#000000',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setScrollFactor(0).setDepth(100);
    } // <-- HIER HAT DIE KLAMMER GEFEHLT!

    update() {
        this.player.update();

        if (this.player.y > 620) {
            this.scene.restart();
        }

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update) enemy.update();
        });

        if (this.bg) {
            this.bg.tilePositionX = this.cameras.main.scrollX * 0.3;
        }
    }

    handleEnemyCollision(player, enemy) {
        const isJumpingOnTop = player.body.velocity.y > 0 && player.y < enemy.y - 10;
        if (isJumpingOnTop) {
            player.setVelocityY(-350);
            enemy.destroy();
        } else {
            this.scene.restart();
        }
    }

    collectCache(player, cache) {
        this.tweens.killTweensOf(cache);
        cache.destroy();
        
        this.score++;
        this.scoreText.setText(`Level 2 - Caches: ${this.score} / 10`);

        if (this.score >= 10) {
            this.add.text(400, 300, 'Herzlichen Glückwunsch - Alle Caches gefunden.\n Jetzt wartet die echte Dose auf dich.\n Bitte sei vorsichtig.\n Die Schienen müssen zu keinem Zeitpunkt betreten werden.\n Finale Koordinaten: 52.544930, 13.036920 - \n du musst die Treppe runter gehen. \n Nimm eine kleine Erhöhungsmöglichkeit mit.',
                {
                fontSize: '18px',
                fill: '#15ff00',
                fontStyle: 'bold',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setScrollFactor(0);
            
            this.physics.pause();
        }
    }
}
