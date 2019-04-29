export class InputManager extends Phaser.Scene {
    /**
     * It's only a scene that layers the real InputManager :)
     */
    public keys;
    public ee: Phaser.Events.EventEmitter;
    private loaded: boolean;



    constructor() {
        super({
            key:"InputManager",
            active: true
        });
    }

    init():void {
        this.ee = new Phaser.Events.EventEmitter();
        this.keys = this.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right',
            W: 'W',
            S: 'S',
            A: 'A',
            D: 'D',
            fire: 'ENTER'
        });       
    }

    create():void {
        var localEE = this.ee;
        this.keys.up.on('down', function(event) {
            localEE.emit("grid-up");
            /**
             * 1. Key Input to InputManager
             * 2. Event emmited to GameObserver
             * 3. GameObserver listened event from InputManager
             * 4. GameObserver tells Grid to move accordingly
             * 5. Grid moves, emit event back to Game observer
             * 6. GameObserver listened from Grid and tell UIElements to updateGrid
             * 7. Grid Updated. Very nice.
             * 
             */
        });
        this.keys.down.on('down', function(event) {
            localEE.emit("grid-down");
        });
        this.keys.left.on('down', function(event) {
            localEE.emit("grid-left");
        });
        this.keys.right.on('down', function(event) {
            localEE.emit("grid-right");
        });
    }

    onLoadButtonPressed() {
        var localEE = this.ee;
        this.loaded = !this.loaded;
        if (this.loaded) {
            localEE.emit("toggleLoadingWeapon");
            this.keys.W.enabled = true;
            this.keys.S.enabled = true;
            this.keys.A.enabled = true;
            this.keys.D.enabled = true;
            this.keys.fire.enabled = true;
            this.keys.W.on('down', function(event) {
                localEE.emit("eh-up");
            });
            this.keys.S.on('down', function(event) {
                localEE.emit("eh-down");
            });
            this.keys.A.on('down', function(event) {
                localEE.emit("eh-left");
            });
            this.keys.D.on('down', function(event) {
                localEE.emit("eh-right");
            });
            this.keys.fire.once('down', function(event) {
                localEE.emit("fire");
            });
        } else {
            localEE.emit("toggleLoadingWeapon");
            this.keys.W.enabled = false;
            this.keys.S.enabled = false;
            this.keys.A.enabled = false;
            this.keys.D.enabled = false;
            this.keys.fire.enabled = false;
        }
    }
}