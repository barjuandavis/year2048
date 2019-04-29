export class Weapon {

    private name: string;
    private ep: integer;
    private chamber: Point[];
    private multiplier: integer;
    private cost: integer;
    private center: Point;
    private mostLeftTop: Point; 
    private mostRightBottom; Point;

    constructor(name:string,ep:integer,multiplier:integer,chamber:Point[],cost:integer,center,mostLeftTop,mostRightBottom) {
        this.name = name;
        this.ep = ep;
        this.chamber = chamber;
        this.multiplier = multiplier;
        this.cost = cost;
        this.center = center;
        this.mostLeftTop = mostLeftTop;
        this.mostRightBottom = mostRightBottom;
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

    getCenter() {
        return this.center;
    }

    getMostLeftTop() {
        return this.mostLeftTop;
    }

    getMostRightBottom() {
        return this.mostRightBottom;
    }
    
}

export interface Point {
    row: integer;
    column: integer;
}

