export class Titan {
    private stage: integer;
    private titanName: string;
    private titanHP: integer;
    constructor(stage: integer) {
        this.stage = stage;
        let s = this.stage;
        this.setTitanHP(this.getHealthBarAtStage(s)); //titan HP formula
        this.titanName = 'Lorem Ipsum #' + this.stage;
    }

    setTitanHP(HP: integer) {this.titanHP = HP;}
    getTitanHP() {return this.titanHP;}
    getStage() {return this.stage;}
    getTitanName() {return this.titanName;}
    getHealthBarAtStage(stage: integer) {return ((stage*stage*stage) - (stage*stage))*10+64;}
    getTitanBounty() {return this.getHealthBarAtStage(this.getStage())*4;}

    hit(dmg: integer) {
        this.setTitanHP(this.titanHP - dmg); 
        if (this.titanHP <= 0) this.titanHP = 0;
    }
    isDead() {return this.titanHP <= 0;}

    
}