// import Ship from "./ship";
const Ship = require('./ship');

class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = this.createBoard();
        this.shipsNum = 0;
        this.hits = [];
    }

    // [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]

    createBoard() {
        let array = [];
        for (let i = 0; i < this.height; i++) {
            array.push([]);
        }
        for(let i = 0; i < array.length; i++) {
            for (let j = 0; j < this.width; j++) {
                array[i].push({isCellHit: false, isCellMissed: false, ship: false});
            }
        }
        return array;
    }

    placeShip(vertCoord, horzCoord, length, orientation, name) {
        const ship = new Ship(name, length, orientation);
        if (orientation === 'horiz') {
            //check for horiz board overflow
            if (horzCoord+length-1 > this.width-1) {
                return false;
            } 
            //check for ship overlap
            else if (this.checkHorizOverlap(vertCoord, horzCoord, length)) {
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord][horzCoord+i]['ship'] = ship;
                }
                this.shipsNum++;
                return true;
            }
        } else if (orientation === 'vert') {
            //check for vertical board overflow
            if (vertCoord+length-1 > this.height-1) {
                return false;
            } 
            //check for vertical ship overlap
            else if (this.checkVertOverlap(vertCoord, horzCoord, length)) {
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord+i][horzCoord]['ship'] = ship;
                }
                this.shipsNum++;
                return true;
            }
        }
    }

    hasShip(vertCoord, horzCoord) {
        if (this.board[vertCoord][horzCoord]['ship'] === false) {
            return false;
        } else {
            return true;
        }
    }

    // hitExists()

    receiveAttack(vertCoord, horzCoord) {
        const coordinate = this.board[vertCoord][horzCoord];
        
        if (this.hasShip(vertCoord, horzCoord)) {
            if (coordinate['isCellHit'] === false) {
                coordinate['isCellHit'] = true;
                coordinate['ship'].hit(vertCoord, horzCoord);
                this.hits.push([vertCoord, horzCoord]);
            }
        } else if (coordinate['isCellMissed'] === false) {
            coordinate['isCellMissed'] = true;
        }
    }

    allShipsSunk() {
        //traverse the board
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                //check each ship to see if it's sunk
                const coordinate = this.board[i][j];
                if (this.hasShip(i, j) && coordinate['ship']['sunk'] === false) {
                    return false;
                }
            }
        }
        return true;
    }

    hasUnsunkHit(coordinate) {
        if (coordinate['hit'] === true && coordinate['sunk'] === false) {
            return true;
        }
        return false;
    }

    checkHorizOverlap(vertCoord, horzCoord, shipLength) {
        for (let i = 0; i < shipLength; i++) {
            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {
                //has overlap
                return true;
            }
        }
        //no overlap found
        return false;
    }
    
    checkVertOverlap(vertCoord, horzCoord, shipLength) {
        for (let i = 0; i < shipLength; i++) {
            if (this.board[vertCoord+i][horzCoord]['ship'] !== false) {
                //has overlap
                return true;
            }
        }
        //no overlap found
        return false;
    }

    allShipsPlaced() {
        if (this.shipsNum === 5) {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = GameBoard;