import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import Level1Scene from './scenes/Level1Scene.js'; // NEU

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false // Ändere das auf true, um die Hitboxen zu sehen!
        }
    },
    scene: [BootScene, MenuScene, Level1Scene] // NEU hinzugefügt
};

const game = new Phaser.Game(config);