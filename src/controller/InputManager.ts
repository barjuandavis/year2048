export class InputManager extends Phaser.Scene {
    /**
     * It's only a scene that layers the real InputManager :)
     */
    private keys;
    public ee: Phaser.Events.EventEmitter;


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
            right: 'right'
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

}