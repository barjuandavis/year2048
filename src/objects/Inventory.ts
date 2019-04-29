import { Weapon } from "./Weapon";
import * as data from "./weapons.json";

export class Inventory {

    /**
     * 
     * Inventory/Shop are list of Weapons that a player has/has not.
     * 
     * 
     */

    weapons: Array<Weapon> = []; 
    owned: boolean[] = [];
    active: integer;

    constructor() {
        
        for(let i = 0; i<4; i++){
            let s = data[i];
            this.weapons.push(new Weapon(s.name,s.ep,s.multiplier,s.chamber,
                s.cost,
                s.center,
                s.mostLeftTop,
                s.mostRightBottom));
            if (i==0) this.owned.push(true);
            else this.owned.push(false);
        }

        this.active = 3;
    }

    buyWeapon(index){
        this.owned[index] = true;
    }

    getActiveWeapon() {
         return this.weapons[this.active];
    }

}