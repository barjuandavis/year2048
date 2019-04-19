// CLASS FOR UI ELEMENTS

import "phaser";
import { UIElements } from "./scenes/UIElements";
import { GameScene } from "./scenes/GameScene";
import { GameObserver } from "./controller/GameObserver";


const config: GameConfig = {
    type: Phaser.AUTO, //PHASER RENDER METHOD (WebGL or Canvas)
    width: 1024,
    height: 1920,
    parent: 'game',
    scene: [ GameScene, UIElements, GameObserver ],
    input: {
        keyboard: true
      },
};


export class Game extends Phaser.Game {
 constructor (config: GameConfig) {
        super(config);
    }  
}

window.addEventListener("load", () => {
    var game = new Game(config);
});
  