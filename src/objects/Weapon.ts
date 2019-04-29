export class Weapon {

    private name: string;
    private ep: integer;
    private chamber: Chamber;
    private multiplier: integer;
    private cost: integer;


    constructor(name:string,ep:integer,multiplier:integer,chamber:Point[],cost:integer,center,mostLeftTop,mostRightBottom) {
        this.name = name;
        this.ep = ep;
        this.chamber = new Chamber(chamber,center,mostLeftTop,mostRightBottom);
        this.multiplier = multiplier;
        this.cost = cost;
    }

    getChamber() {
        return this.chamber;
    }

    getName() {
        return this.name;
    }

    getEP() {
        return this.ep;
    }

    getMultiplier(){
        return this.multiplier;
    }

    getCost() {
        return this.cost;
    }
}

export interface Point {
    row: integer;
    column: integer;
}

export class Chamber {
    private t: Point[];
    private resetState: Point[];
    private centerIndex: integer;
    private mostLeftTopIndex: integer;
    private mostRightBottomIndex: integer;


    constructor(_t:Point[], _c, _lt, _rb) {
        this.t = _t;
        this.resetState = _t;
        //find index for each strategic position
        this.centerIndex = _c; 
        this.mostLeftTopIndex = _lt;
        this.mostRightBottomIndex = _rb;
    }
    reset() {
        this.t = this.resetState;
    }

    getCenter():Point{return this.t[this.getCenterIndex()];}
    getCenterIndex() {return this.centerIndex;}
    getMostLeftTop():Point {return this.t[this.getMostLeftTopIndex()];}
    getMostLeftTopIndex() {return this.mostLeftTopIndex;}
    getMostRightBottom():Point {return this.t[this.getMostRightBottomIndex()];}
    getMostRightBottomIndex() {return this.mostRightBottomIndex;}
    getArrayOfTargets() {return this.t;}
    

    move(dir:integer): boolean { 
        /**
         * 0:up
         * 1:right
         * 2:down
         * 3:left
         */
        var valid = false;
            if (dir == 0 && this.getMostLeftTop().row-1 >= 0) {
                valid = true;
                for (let i=0; i<this.t.length; i++) this.t[i].row -= 1;
            } 
            else if (dir == 1 && this.getMostRightBottom().column+1 <4) {
                valid = true;
                for (let i=0; i<this.t.length; i++) this.t[i].column += 1;
            }
            else if (dir == 2 && this.getMostRightBottom().row+1 < 4) {
                valid = true;
                for (let i=0; i<this.t.length; i++) this.t[i].row += 1;
            }
            else if (dir == 3 && this.getMostLeftTop().column-1 >= 0) {
                valid = true;
                for (let i=0; i<this.t.length; i++) this.t[i].column -= 1;
            }
        return valid;
    }


}

