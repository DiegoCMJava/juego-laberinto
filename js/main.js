
import Intro from './scenes/intro.js';
import Game from './scenes/game.js';
import Final from './scenes/final.js';

const config = {
    type: Phaser.AUTO,
   scale: {
        width: 1000,
        height: 700,
        parent: 'game'
    },
    pixelArt: true,

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    dom: {
        createContainer: true
    },
    scene: [
        Intro,
        Game,
        Final
    ]
};

const game = new Phaser.Game(config);