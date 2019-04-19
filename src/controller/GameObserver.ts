import { UIElements } from "../scenes/UIElements";
import { GameScene } from "../scenes/GameScene";

export class GameObserver extends Phaser.Scene {
    // this class observes anychanges happened at GameScene
    // and emit the event to the UI.
    private ui_scene: UIElements; 
    private game_scene: GameScene;
    private space: Phaser.Input.Keyboard.Key;
    constructor() {
        super({
            key: "GameObserver",
            active: true
        });
    }

    init() {
        this.ui_scene = <UIElements> this.scene.get('UIElements');
        this.game_scene = <GameScene> this.scene.get('GameScene');
    }

    create(): void {
        var eventEmmiter = this.game_scene.ee;
        eventEmmiter.on("hit",this.onHit,this);
        eventEmmiter.on("update_stage",this.onUpdateStage,this);
        var space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    onHit() {this.ui_scene.updateHealthBar();}
    onUpdateStage() {this.ui_scene.updateStage();}

}