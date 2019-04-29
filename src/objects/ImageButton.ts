export class ImageButton extends Phaser.GameObjects.Sprite {
    upFrame;
    downFrame;
    overFrame;
    myCallback;
    myScope;

 
    constructor(_scene, _x, _y, _tex, _upFrame,_downFrame, _callback) {
        super(_scene, _x, _y, _upFrame, );
        
        
        this.upFrame = _upFrame;
        this.downFrame = _downFrame;
        this.overFrame = _upFrame;
        this.myCallback = _callback;
        this.myScope = _scene; // scope
 
        this.setInteractive();
        this.on('pointerup', this.pointerUp, this);
        this.on('pointerdown', this.pointerDown, this);
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);
 
        
        _scene.add.existing(this);
 
    }
 
    pointerUp(pointer) {
        this.setFrame(this.upFrame);
        this.myCallback.call(this.myScope,'up');
    }
 
    pointerDown(pointer) {
        this.setFrame(this.downFrame);
        //this.myCallback.call(this.myScope,'down');
    }
 
    pointerOver(pointer, x, y) {
        this.setFrame(this.overFrame);
    }
 
    pointerOut(pointer) {
        this.setFrame(this.upFrame);
    }   
}