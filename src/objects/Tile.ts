export class Tile {
    private value: integer;

    constructor(value: integer) {
        this.setValue(value);
    }
    
    setValue(value: integer) {this.value = value;}
    getValue() {return this.value;}
    // double() {this.setValue(this.getValue() * 2);}

    isAvailable() {return (this.value == 0);}
    isOccupied() {return !this.isAvailable();}
}