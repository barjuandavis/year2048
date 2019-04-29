import { Weapon } from "./Weapon";
import * as data from "../objects/weapons.json";
export class Inventory {

    /**
     * 
     * Inventory/Shop are list of Weapons that a player has/has not.
     * 
     * 
     */

    private weapons: Weapon[]; 
    private owned: boolean[];
    private active: integer;

    constructor() {
        for (let i=0; i<data.length; i++) {
            var s = data[i];
            this.weapons.push(new Weapon(
                data[i].name,
                data[i].ep,
                data[i].multiplier,
                data[i].chamber,
                data[i].cost,
                data[i].center,
                data[i].mostLeftTop,
                data[i].mostRightBottom
                ));
            if (i == 0) this.owned.push(true);
            else this.owned.push(false);
        }
    }

    buyWeapon(index){
        this.owned[index] = true;
    }

    getActiveWeapon() : Weapon {
        return this.weapons[this.active];
    }

}