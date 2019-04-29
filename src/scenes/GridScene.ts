import { InputManager } from "../controller/InputManager";
import { Input } from "phaser";
import { Grid } from "../objects/Grid";
import { Weapon, Point } from "../objects/Weapon";



export class GridScene extends Phaser.Scene {

    private input_ee: Phaser.Events.EventEmitter;
    private input_manager: InputManager;
    private grid: Grid;
    private mainGridRectangle: Phaser.GameObjects.Rectangle;
    private cells: Phaser.GameObjects.Rectangle[][] = [[]];
    private cellsCaption: Phaser.GameObjects.Text[][] = [[]];
    private SIZE = 4;
    private mainGrid_x = 512;
    private mainGrid_y = 1250;
    private mainGrid_size = 500;
    private cells_size = this.mainGrid_size/4;
         
    constructor() {
        super({
            key:"GridScene",
            active: true
        });
    }

    init() {
        this.grid = new Grid(this.SIZE);
    }

    preload() {
        this.input_manager = <InputManager> this.scene.get("InputManager");
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
        this.generateGrid();
    }

    onUpPressed() {
        this.grid.moveTiles(3);
        this.updateGrid();
    }
    onDownPressed() {
        this.grid.moveTiles(1);
        this.updateGrid();
    }
    onLeftPressed() {
        this.grid.moveTiles(0);
        this.updateGrid();
    }
    onRightPressed() {
        this.grid.moveTiles(2);
        this.updateGrid();
    }

    getColorByValue(val:number) {
        var s;
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
        var index = <integer> Math.log2(val);
        index = index - 1;
        
        if (index >= 11) index = 11;
        s = colors[index];
        return s;
    }
    updateGrid() {
        var t = this.grid.getTiles();
        for (let i = 0; i<this.SIZE; i++) {
            for (let j = 0; j<this.SIZE; j++) {
                var n = t[i][j].getValue();
                this.cells[i][j].setFillStyle(this.getColorByValue(n),1);
                if (n == 0) {
                    this.cellsCaption[i][j].setText("");
                } else {
                    this.cellsCaption[i][j].setText(""+n);
                }
            }
        }
    }

    generateGrid() {
        var t = this.grid.getTiles();
        for (let i = 0; i<this.SIZE; i++) {
            this.cells[i] = [];
            this.cellsCaption[i] = [];
            for (let j = 0; j<this.SIZE; j++) {
                var n = t[i][j].getValue();
                this.cells[i].push(this.add.rectangle(
                    i * this.cells_size + this.mainGridRectangle.getTopLeft().x,
                    j * this.cells_size + this.mainGridRectangle.getTopLeft().y,
                    this.cells_size,
                    this.cells_size
                ).setOrigin(0,0)
                .setStrokeStyle(4,0xfafafa,1)
                .setFillStyle(this.getColorByValue(n),1));
                

                this.cellsCaption[i].push(this.add.text(
                    i * this.cells_size + this.mainGridRectangle.getTopLeft().x,
                    j * this.cells_size + this.mainGridRectangle.getTopLeft().y,
                    "" + n
                ).setOrigin(0,0)
                .setFontFamily('Arial')
                .setFontSize(40)
                .setFontStyle("Bold")
                .setColor("#ffffff")
                .setDepth(1)
                .setAlign('center'));
            }
        }
    }

    loadWeapon(weapon:Weapon){
        this.turnOnWeaponLoader(weapon); 
    }

    turnOnWeaponLoader(weapon:Weapon){ 
        for (let i=0; i<this.SIZE; i++) {
            for (let j=0; j<this.SIZE; j++) {
                this.cells[i][j].on('pointerover',function(){
                    console.log(i+" "+j);
                });
            }
        }
    }

    highlight(weapon:Weapon) {
        let chamber = weapon.getChamber;
        for (let i=0; i<chamber.length; i++) {
            this.cells[chamber[i].row][chamber[i].column].setAlpha(0.5);
        }
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