import { UIElements } from "./UIElements";
import { Titan } from "../objects/Titan";
import { Inventory } from "../objects/Inventory";


export class GameScene extends Phaser.Scene {
    private playerName: string;
    private currentTitan: Titan;
    private currentStage: integer;
    private currentGold: integer;
    private name: string;
    private background: Phaser.GameObjects.Image;
    private inventory: Inventory;
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
        this.inventory = new Inventory();
        this.currentStage = 0;
        this.currentGold = 0;
    }
    preload() {
        this.load.image('bg','./src/assets/bg/bg.png');
    }
    create() {
        this.background = this.add.image(-200,200,"bg")
        .setOrigin(0)
        .setScale(5);
        this.nextStage();
    }


    getCurrentGold() {
        return this.currentGold;
    }
    getStage():integer {return this.currentStage;}
    nextStage() {
        //get bounty from prev stage
        if (this.currentStage != 0) {
            console.log("Current stage's bounty: " + this.getTitan().getTitanBounty());
            this.currentGold += this.getTitan().getTitanBounty();
            
        }
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
        }
    }

}