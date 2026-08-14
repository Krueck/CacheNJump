import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        
         
        
        this.add.text(400, 300, 'Lade Assets...', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        // Spielfigur-Bilder
        this.load.image('player_idle', 'assets/geocacher_steht.png');
        this.load.image('player_walk', 'assets/geocacher_laeuft.png');
        this.load.image('player_jump', 'assets/geocacher_springt.png');
        this.load.image('enemy', 'assets/Muggel.png');
        this.load.image('zecke', 'assets/Zecke.png');
        this.load.image('Mosquito', 'assets/Mosquito.png');
        // Level-Grafiken
        this.load.image('ground', 'assets/Boden.png');
        this.load.image('beam', 'assets/Balken.png');
        this.load.image('cache', 'assets/Cache 1.png');
        this.load.image('bg', 'assets/Wald.png');

        // Partikel
        this.load.image('spark', 'https://labs.phaser.io/assets/particles/yellow.png');
    }

    create() {
        this.scene.start('Menu');
    }
}