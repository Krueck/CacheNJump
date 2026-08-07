import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        // Titel
        this.add.text(400, 250, 'GEOCACHER ADVENTURE', {
            fontSize: '42px',
            fill: '#4a90e2',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Start-Aufforderung
        const startText = this.add.text(400, 350, 'Klicke zum Starten', {
            fontSize: '24px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        // Kleiner Pulsier-Effekt für den Text
        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Auf Klick warten
        this.input.on('pointerdown', () => {
            this.scene.start('Level1'); // Kommentarstriche entfernt!
        });
    }
}