export class SpriteButton extends Phaser.GameObjects.Sprite {
    callbackDown;
    callbackUp;
    myScope;

 
    constructor(_scene, _x, _y, _spritesheet,_callbackDown?, _callbackUp?) {
        super(_scene,_x,_y,_spritesheet);
        
        
        this.callbackDown = _callbackDown;
        this.callbackUp = _callbackUp;
        this.myScope = _scene; // scope
 
        this.setInteractive();
        this.on('pointerup', this.pointerUp, this);
        this.on('pointerdown', this.pointerDown, this);
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);
 
        
        _scene.add.existing(this);
 
    }
 
    pointerUp(pointer) {
        this.setFrame(0);
        if (this.callbackUp != undefined) this.callbackUp.call(this.myScope,'up');
    }
 
    pointerDown(pointer) {
        this.setFrame(1);
        if (this.callbackDown != undefined) this.callbackDown.call(this.myScope,'down');
    }
 
    pointerOver(pointer, x, y) {
        this.setTint(0x909090);
    }
 
    pointerOut(pointer) {
        this.setFrame(0);
        this.clearTint();
    }   
}