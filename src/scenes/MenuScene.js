import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const bg = this.add.image(400, 300, 'menuBG');

    // 2. An die Bildschirmgröße anpassen (z. B. 800x600)
    bg.setDisplaySize(800, 600);

    // Optional: Tiefe festlegen, damit das Bild ganz unten liegt
    bg.setDepth(0);
        this.input.on('pointerdown', () => {
            this.scene.start('Level1');
        });
        this.add.text(400, 250, '', {
            fontSize: '90px',
            fill: '#4a90e2',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        const startText = this.add.text(400, 240, 'Sammle alle Geocaches - Aber hüte dich vor den Muggeln! \n Klicke mit der Maus um loszulegen.', {
                fontSize: '20px',
            fill: '#2427f3',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

    }
    
}