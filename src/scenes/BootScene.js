import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Lade-Text auf dem Bildschirm anzeigen
        this.add.text(400, 300, 'Lade Assets...', { 
            fontSize: '24px', fill: '#ffffff' 
        }).setOrigin(0.5);

        // Wir laden Grafiken direkt von den Phaser-Testservern.
        // Ein kleiner Stern dient uns als Geocache-Dose!
        this.load.image('geocacher', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
        this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.image('cache', 'https://labs.phaser.io/assets/sprites/star.png');
        
        // Das Bild für den Partikeleffekt (ein kleiner gelber Lichtpunkt)
        this.load.image('spark', 'https://labs.phaser.io/assets/particles/yellow.png');
    }

    create() {
        // Sobald alles heruntergeladen ist, geht es ins Menü
        this.scene.start('Menu');
    }
}