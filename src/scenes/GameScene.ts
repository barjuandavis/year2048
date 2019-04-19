import { UIElements } from "./UIElements";
import { Titan } from "../objects/Titan";


export class GameScene extends Phaser.Scene {
    private playerName: string;
    private currentTitan: Titan;
    private currentStage: integer;
    private name: string;
    private background: Phaser.GameObjects.Image;
    public ee: Phaser.Events.EventEmitter;

    constructor () {
        super({
            key: 'GameScene',
            active: true
        });
    }

    init(): void {
        this.playerName = "Some name here";
        this.ee = new Phaser.Events.EventEmitter();
        this.currentStage = 0;
    }
    preload() {
        this.load.image('bg','./src/assets/bg/bg.png');
    }
    create() {
        this.background = this.add.image(-200,200,"bg")
        .setOrigin(0)
        .setScale(5);
        var a = <GameScene> this.scene.get("GameScene");   
        var space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        space.on('down',function(event){
            a.dealDamage(50);
        });
        this.nextStage();
    }


    getStage():integer {return this.currentStage;}
    nextStage() {
        this.currentStage += 1; 
        this.generateTitan();
        this.ee.emit("update_stage");
    }
    getTitan():Titan {return this.currentTitan;}
    

    private generateTitan() {this.currentTitan = new Titan(this.getStage());}

    dealDamage(dmg: integer) : void {
        this.currentTitan.hit(dmg);
        this.ee.emit("hit");
        if(this.currentTitan.isDead()) {
            this.nextStage();
            console.log("Next stage: " + this.getStage());
        }
    }



}