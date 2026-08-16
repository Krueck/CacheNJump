import Phaser from 'phaser';
import './style.css';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import Level1Scene from './scenes/Level1Scene.js';
import Level2Scene from './scenes/Level2Scene.js'; // Importieren

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
            debug: false
        }
    },
    scene: [BootScene, MenuScene, Level1Scene, Level2Scene]
};

const game = new Phaser.Game(config);