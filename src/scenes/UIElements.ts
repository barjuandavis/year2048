import { GameScene } from "./GameScene";
import { Loader } from "phaser";
import { ImageButton } from "../objects/ImageButton";

export class UIElements extends Phaser.Scene {
    //works by displaying whatever is passed from Game Scene
    private loadButton: Phaser.GameObjects.Image;
    private loadButton2: ImageButton;
    private shopButton: Phaser.GameObjects.Image; 
    private hpRed: Phaser.GameObjects.Image;
    private hpFrame: Phaser.GameObjects.Image;
    private bossPlaceHolder: Phaser.GameObjects.Text;
    private goldPlaceHolder: Phaser.GameObjects.Text;   
    private healthPlaceHolder: Phaser.GameObjects.Text;
    private gameObj: GameScene;

    constructor ()
    {
        super({
            key: 'UIElements',
            active: true
        });
    }

    init() {
        this.gameObj = <GameScene> this.scene.get("GameScene");
    }

    preload ()
    {
       this.load.image('load',"./src/assets/ui/load_button/0.png");
       this.load.image('load_o',"./src/assets/ui/load_button/0.png");
       this.load.image('load_out',"./src/assets/ui/load_button/0.png");
       this.load.image('load_d',"./src/assets/ui/load_button/1.png");
       this.load.image('shop',"./src/assets/ui/shop_button/0.png");
       this.load.image('shop_c',"./src/assets/ui/shop_button/1.png");
       this.load.image('hp_frame',"./src/assets/ui/healthbar/frame.png");
       this.load.image('hp_red',"./src/assets/ui/healthbar/hp_red.png");
    }

    create ()
    {
        /*
            1. Show boss namespace
            2. Show button places
            3. 
        */
        this.loadButton2 = new ImageButton(this,1024/2,1920-300,'load','load','load_c','load',this.onLoadButtonClicked).setScale(2);
        this.shopButton = this.add.image(1024/2,1920-100,'shop').setScale(2);
        this.bossPlaceHolder = this.add.text(315,330,
            "Stage : " + this.gameObj.getStage()).setScale(2);
        this.goldPlaceHolder = this.add.text(315,300,
            "Gold : " + this.gameObj.getCurrentGold()).setScale(2);
        this.hpRed = this.add.image(540,390,"hp_red").setScale(4.5);    
        this.hpFrame = this.add.image(1024/2,400,"hp_frame").setScale(4.5);    
        this.healthPlaceHolder = this.add.text(512,374,
            "" + this.gameObj.getTitan().getTitanHP()).setScale(2);
    }


    updateHealthBar() {
        var currentHP = this.gameObj.getTitan().getTitanHP();
        var maxHP = this.gameObj.getTitan().getHealthBarAtStage(this.gameObj.getStage());
        var itung = currentHP/maxHP;
        this.hpRed.setCrop(0,0, 73 * (itung), 7);
        this.healthPlaceHolder.setText("" + this.gameObj.getTitan().getTitanHP());
    }    

    updateStage() {
        if (this.bossPlaceHolder != undefined) {
            this.bossPlaceHolder.setText("Stage : " + this.gameObj.getStage());
            this.goldPlaceHolder.setText("Gold : "+this.gameObj.getCurrentGold());
            this.updateHealthBar();
        }
    }

    onLoadButtonClicked() {
        console.log("HELLO!");
    }    


}