import { UIElements } from "../scenes/UIElements";
import { GameScene } from "../scenes/GameScene";
import { InputManager } from "./InputManager";

export class GameObserver extends Phaser.Scene {
    // this class observes anychanges happened at GameScene
    // and emit the event to the UI.
    private ui_scene: UIElements; 
    private game_scene: GameScene;
    private input_manager: InputManager;
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
        this.input_manager = <InputManager> this.scene.get("InputManager");
        
    }

    create(): void {
        var eventEmmiter = this.game_scene.ee;
        var inputEmmiter = this.input_manager.ee;
        eventEmmiter.on("hit",this.onHit,this);
        eventEmmiter.on("update_stage",this.onUpdateStage,this);    
    }


    onHit() {this.ui_scene.updateHealthBar();}
    onUpdateStage() {this.ui_scene.updateStage();}

}