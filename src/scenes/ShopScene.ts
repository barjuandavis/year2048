import { GameScene } from "./GameScene";
import { Inventory } from "../objects/Inventory";
import { SpriteButton } from "../objects/SpriteButton";

export class ShopScene extends Phaser.Scene {
    private game_scene: GameScene;
    private inv: Inventory;
    private home: SpriteButton;
    private buy: Phaser.GameObjects.Sprite;
    private active: Phaser.GameObjects.Sprite;
    
    constructor(parameters) {
        super({
            key:"ShopScene",
            active: false
        });
    }

    init() {
        this.game_scene = <GameScene> this.scene.get("GameScene");
    }

    preload() {
        this.load.spritesheet({
            key: 'buy_ss',
            url: './src/assets/ui/inventory/inventoryButton100x68px.png',
            frameConfig: {
                frameWidth: 100,
                frameHeight: 68,
                }
             });
        this.load.spritesheet({
            key: 'active_ss',
            url: './src/assets/ui/inventory/inventoryButton100x68px.png',
            frameConfig: {
                frameWidth: 100,
                frameHeight: 68,
                }
             });
        this.load.spritesheet({
            key: 'home_ss',
            url: './src/assets/ui/home/homeButton100x68px.png',
            frameConfig: {
                frameWidth: 100,
                frameHeight: 68,
                }
             });
        this.inv = this.game_scene.getInventory();
    }

    create() {
        this.home = new SpriteButton(this,200,200,'home_ss',undefined,this.onHomeClicked).setOrigin(0,0).setScale(2).setZ(1);
        this.add.rectangle(0,0,1080,1920,0x000000,0.5).setOrigin(0,0); // bg
        for (let i=0; i<this.inv.weapons.length; i++) {



        }
    }

    update() {

    }

    onHomeClicked() {
        this.scene.stop();
    }

}