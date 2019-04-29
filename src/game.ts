// CLASS FOR UI ELEMENTS

import "phaser";
import { UIElements } from "./scenes/UIElements";
import { GameScene } from "./scenes/GameScene";
import { GameObserver } from "./controller/GameObserver";
import { InputManager } from "./controller/InputManager";
import { GridScene } from "./scenes/GridScene";


const config: GameConfig = {
    type: Phaser.WEBGL, //PHASER RENDER METHOD (WebGL or Canvas)
    width: 1024,
    height: 1920,
    parent: 'game',
    scene: [ GameScene, UIElements, InputManager, GameObserver, GridScene ],
    input: {
        keyboard: true
      },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};


export class Game extends Phaser.Game {
 constructor (config: GameConfig) {
        super(config);
    }  
}

window.addEventListener("load", () => {
    var game = new Game(config);
});
  