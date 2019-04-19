import { Tile } from "./Tile";

const DIRECTIONS = [
    [0, -1], // up
    [1, 0], // right
    [0, 1], // down
    [-1, 0] // left
];

const INDEXES = [
    [ [3,0] ],
    [ [3,0], [3,1], [3,2] ],
    [ [1,0], [3,0], [2,1], [1,2], [3,2] ],
    [ [1,0], [2,0], [3,0], [1,1], [2,1], [3,1], [2,2], [3,2] ],
    [ [3,0] ],
    [ [0,0], [1,0], [2,0], [3,0], [0,1], [1,1], [2,1], [3,1], [0,2], [1,2], [2,2], [3,2], [0,3], [1,3], [2,3], [3,3] ],
    [ [0,0], [1,0], [2,0], [3,0], [0,1], [1,1], [2,1], [3,1], [0,2], [1,2], [2,2], [3,2], [0,3], [1,3], [2,3], [3,3] ],
    [ [3,0] ],
    [ [3,0], [3,1], [3,2], [3,3] ]
]

export class Grid {
    private size: integer;
    private tiles: Tile[][] = [[]];

    constructor(size: integer) {
        this.setSize(size);
        this.createTiles();
        this.addRandomTile(2); // first random tile
    }

    setSize(size: integer) {this.size = size;}
    getSize() {return this.size;}

    createTiles() {
        for(var _i = 0; _i < this.size; ++_i) {
            this.tiles[_i] = [];
            for(var _j = 0; _j < this.size; ++_j) {
                this.tiles[_i].push(new Tile(0));
            }
        }
    }

    // direction
    // 0 - up
    // 1 - right
    // 2 - down
    // 3 - left
    moveTiles(direction: integer) {
        var dirX = DIRECTIONS[direction][0];
        var dirY = DIRECTIONS[direction][1];

        var horizontal = (dirY == 0);
        var positive = ((horizontal && dirX == 1) || (!horizontal && dirY == 1));

        var moved = this.combineTiles(horizontal, positive);

        // add random tile after each move
        if(moved) {
            var random_value = Math.random() <= 0.9? 2 : 4;
            this.addRandomTile(random_value);
        }
    }

    // horizontal = left & right, vertical = up & down
    // positive = right & down, negative = left & up
    combineTiles(horizontal: boolean, positive: boolean) {
        var moved = false;
        for(var _i = 0; _i < this.size; ++_i) {
            var new_values = [];
            var old_values = [];
            var prev_value = 0;
            var _j = (positive)? this.size - 1 : 0;
            for(var _x = 0; _x < this.size; ++_x) {
                var cur_tile = (horizontal)? this.tiles[_i][_j] : this.tiles[_j][_i];
                var cur_value = cur_tile.getValue();
                old_values.push(cur_value);
                if(cur_value > 0) {
                    if(cur_value == prev_value) {
                        new_values.push(cur_value * 2);
                        prev_value = 0;
                    }
                    else {
                        if(prev_value > 0)
                            new_values.push(prev_value);
                        prev_value = cur_value;
                    }
                }
                _j += (positive)? -1 : 1;
            }
            if(prev_value > 0)
                new_values.push(prev_value);

            // var str = "";
            // for(var _x = 0; _x < new_values.length; ++_x) {
            //     str = str + " " + new_values[_x]; 
            // }
            // console.log(str);

            // place combined tiles
            _j = (positive)? this.size - 1 : 0;
            for(var _x = 0; _x < this.size; ++_x) {
                var temp_tile = (horizontal)? this.tiles[_i][_j] : this.tiles[_j][_i];
                var value = 0;
                if(_x < new_values.length)
                    value = new_values[_x];
                if(!moved && value != old_values[_x])
                    moved = true;
                temp_tile.setValue(value);
                _j += (positive)? -1 : 1;
            }
        }
        return moved;
    }

    getRandomAvailableTile() {
        var availableTiles = this.getAvailableTiles();
        if(availableTiles.length > 0)
            return availableTiles[Math.floor(availableTiles.length * Math.random())];
        else
            return null;
    }

    getAvailableTiles() {
        var availableTiles = [];
        for(var _i = 0; _i < this.size; ++_i) {
            for(var _j = 0; _j < this.size; ++_j) {
                var _tile = this.tiles[_i][_j];
                if(_tile.isAvailable())
                    availableTiles.push(_tile);
            }
        }
        return availableTiles;
    }

    addRandomTile(value: integer) {
        var randomTile = this.getRandomAvailableTile();
        if (randomTile != null)
            randomTile.setValue(value);
    }

    getSum(id: integer) {
        var isValid = true;
        var sum = 0;
        var tile_index = INDEXES[id];
        
        for(var _x = 0; _x < tile_index.length; ++_x) {
            var i = tile_index[_x][0];
            var j = tile_index[_x][1];
            var cur_value = this.tiles[i][j].getValue();
            if(cur_value > 0) {
                sum += cur_value;
            }
            else {
                isValid = false;
                sum = 0;
                break;
            }
        }
        
        return {isValid, sum};
    }

    print() {
        for(var _i = 0; _i < this.size; ++_i) {
            var _str = ""
            for(var _j = 0; _j < this.size; ++_j) {
                var cur_tile = this.tiles[_i][_j];
                _str = _str + " " + cur_tile.getValue();
            }
            console.log(_str);
        }
    }
}