import { InputManager } from "../controller/InputManager";
import { Input } from "phaser";
import { Grid } from "../objects/Grid";
import { Weapon, Point } from "../objects/Weapon";
import { GameScene } from "./GameScene";



export class GridScene extends Phaser.Scene {

    private input_ee: Phaser.Events.EventEmitter;
    private input_manager: InputManager;
    private game_scene: GameScene;
    private grid: Grid;
    private mainGridRectangle: Phaser.GameObjects.Rectangle;
    private cells: Phaser.GameObjects.Rectangle[][] = [];
    private highlighter: Phaser.GameObjects.Rectangle[][] = [];
    private cellsCaption: Phaser.GameObjects.Text[][] = [];
    public static SIZE = 4;
    private mainGrid_x = 512;
    private mainGrid_y = 1250;
    private mainGrid_size = 500;
    private cells_size = this.mainGrid_size/4;
    private loading: boolean;
    private highlightAnim: Phaser.Tweens.Timeline;
    private weapon: Weapon;

         
    constructor() {
        super({
            key:"GridScene",
            active: true
        });
    }

    init() {
        this.grid = new Grid(GridScene.SIZE);
        this.loading = false;
    }

    preload() {
        this.input_manager = <InputManager> this.scene.get("InputManager");
        this.game_scene = <GameScene> this.scene.get("GameScene");
    }    

    create() {  
        
        this.input_ee = this.input_manager.ee;
        this.mainGridRectangle = this.add.rectangle(
            this.mainGrid_x,
            this.mainGrid_y,
            this.mainGrid_size,
            this.mainGrid_size);
        this.mainGridRectangle.setFillStyle(0x000000,0);
        this.mainGridRectangle.setStrokeStyle(4,0xfafafa,0.2);
        this.input_ee.on("grid-up",this.onUpPressed,this);
        this.input_ee.on("grid-down",this.onDownPressed,this);
        this.input_ee.on("grid-left",this.onLeftPressed,this);
        this.input_ee.on("grid-right",this.onRightPressed,this);
        this.input_ee.on("eh-up",this.moveChamberUp,this);
        this.input_ee.on("eh-right",this.moveChamberRight,this);
        this.input_ee.on("eh-down",this.moveChamberDown,this);
        this.input_ee.on("eh-left",this.moveChamberLeft,this);
        this.input_ee.on("toggleLoadingWeapon", this.toggleLoadWeapon,this);
        this.input_ee.on("fire",this.fireAtWill,this);
        this.generateGrid();
    }

    onUpPressed() {
        this.grid.moveTiles(0);
        this.updateGrid();
    }
    onDownPressed() {
        this.grid.moveTiles(2);
        this.updateGrid();
    }
    onLeftPressed() {
        this.grid.moveTiles(3);
        this.updateGrid();
    }
    onRightPressed() {
        this.grid.moveTiles(1);
        this.updateGrid();
    }

    getColorByValue(val:number) {
        let s;
        let colors = [
            GridScene.COLORS_BACKGROUND.Number_2,
            GridScene.COLORS_BACKGROUND.Number_4,
            GridScene.COLORS_BACKGROUND.Number_8,
            GridScene.COLORS_BACKGROUND.Number_16,
            GridScene.COLORS_BACKGROUND.Number_32,
            GridScene.COLORS_BACKGROUND.Number_64,
            GridScene.COLORS_BACKGROUND.Number_128,
            GridScene.COLORS_BACKGROUND.Number_256,
            GridScene.COLORS_BACKGROUND.Number_512,
            GridScene.COLORS_BACKGROUND.Number_1024,
            GridScene.COLORS_BACKGROUND.Number_2048
        ];
        if (val == 0) return 0x000000;
        let index = <integer> Math.log2(val);
        index = index - 1;
        
        if (index >= 11) index = 11;
        s = colors[index];
        return s;
    }
    updateGrid() {
        let t = this.grid.getTiles();
        for (let i = 0; i<GridScene.SIZE; i++) {
            for (let j = 0; j<GridScene.SIZE; j++) {
                let n = t[i][j].getValue();
                this.cells[i][j].setFillStyle(this.getColorByValue(n),1);
                if (n == 0) {
                    this.cellsCaption[i][j].setText("");
                } else {
                    this.cellsCaption[i][j].setText(""+n);
                }
            }
        }
    }

    clearHighligts() {
        for (let i = 0; i<GridScene.SIZE; i++) {
            for (let j = 0; j<GridScene.SIZE; j++) {
                this.highlighter[i][j].setAlpha(0);
            }
        }
    }

    generateGrid() {
        let t = this.grid.getTiles();
        for (let i = 0; i<GridScene.SIZE; i++) {
            this.cells[i] = [];
            this.highlighter[i] = [];
            this.cellsCaption[i] = [];
            for (let j = 0; j<GridScene.SIZE; j++) {
                let n = t[i][j].getValue();
                this.cells[i][j] = this.add.rectangle(
                    j * this.cells_size + this.mainGridRectangle.getTopLeft().x,
                    i * this.cells_size + this.mainGridRectangle.getTopLeft().y,
                    this.cells_size,
                    this.cells_size
                ).setOrigin(0,0)
                .setStrokeStyle(4,0xfafafa,0.2)
                .setFillStyle(this.getColorByValue(n),1);
                this.highlighter[i][j] = this.add.rectangle(
                    j * this.cells_size + this.mainGridRectangle.getTopLeft().x,
                    i * this.cells_size + this.mainGridRectangle.getTopLeft().y,
                    this.cells_size,
                    this.cells_size
                ).setOrigin(0,0)
                .setStrokeStyle(4,0x00000,1)
                .setFillStyle(0x00ff15,1)
                .setAlpha(0);
                this.cellsCaption[i][j] = this.add.text(
                    j * this.cells_size + this.mainGridRectangle.getTopLeft().x,
                    i * this.cells_size + this.mainGridRectangle.getTopLeft().y,
                    "" + n
                ).setOrigin(0,0)
                .setFontFamily('Arial')
                .setFontSize(40)
                .setFontStyle("Bold")
                .setColor("#ffffff")
                .setDepth(1)
                .setAlign('center');
            }
        }
    }

    toggleLoadWeapon() {
        this.loading = !(this.loading);
        if (!this.loading) {
            this.clearHighligts();
        } else {
            this.moveChamberUp();
            this.moveChamberDown();
        }
    }


    highlight(weapon: Weapon) {
        let c = weapon.getChamber();
        let points = c.getArrayOfTargets();
        for (let i=0; i<points.length; i++) {
            let r = points[i].row;
            let c = points[i].column;
            this.highlighter[r][c].setAlpha(0.3);
        }
    }

    moveChamber(dir) {
        let weapon = this.game_scene.getCurrentWeapon();
        weapon.getChamber().move(dir);
        this.clearHighligts();
        this.highlight(weapon);
    }

    fire(weapon:Weapon):void {
        let t = this.grid.getTiles();
        let c = weapon.getChamber();
        let points = c.getArrayOfTargets();
        let total = 0;
        for (let i=0; i<points.length; i++) {
            let r = points[i].row;
            let c = points[i].column;
            if (t[r][c].getValue() == 0) return;
            total += t[r][c].getValue() * weapon.getMultiplier();
        }
        this.game_scene.dealDamage(total);
        for (let i=0; i<points.length; i++) this.remove(points[i].row,points[i].column);

    }

    fireAtWill() {this.fire(this.game_scene.getCurrentWeapon())}
    moveChamberUp() {this.moveChamber(0);}
    moveChamberRight() {this.moveChamber(1);}
    moveChamberDown() {this.moveChamber(2);}
    moveChamberLeft() {this.moveChamber(3);}
    remove(row,column) {
        this.grid.removeTile(row,column);
        this.updateGrid();
    }

}

export namespace GridScene {
    export enum COLORS_BACKGROUND {
        Number_2 = 0x1565c0, //w 
        Number_4 = 0x00bcd4, //b
        Number_8 = 0x5d34af, //w
        Number_16 = 0x9575cd,
        Number_32 = 0x004d40,
        Number_64 = 0x009688,
        Number_128 = 0x827717,
        Number_256 = 0xcddc39,
        Number_512 = 0x9c27b0,
        Number_1024 = 0xba68c8,
        Number_2048 = 0x212121,
    }
}


