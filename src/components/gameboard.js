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

    placeShip(xCoord, yCoord, length, orientation, name) {
        // console.log(`x coord: ${xCoord}, yCoord: ${yCoord}`);
        const ship = new Ship(name, length, orientation);
        if (orientation === 'x') {
            //check for x board overflow
            if (xCoord+length-1 > this.width-1) {
                return false;
            } 
            //check for ship overlap
            else if (this.checkXOverlap(yCoord, xCoord, length)) {
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[yCoord][xCoord+i]['ship'] = ship;
                }
                this.shipsNum++;
                return true;
            }
        } else if (orientation === 'y') {
            //check for y board overflow
            if (yCoord+length-1 > this.height-1) {
                return false;
            } 
            //check for vertical ship overlap
            else if (this.checkYOverlap(yCoord, xCoord, length)) {
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[yCoord+i][xCoord]['ship'] = ship;
                }
                this.shipsNum++;
                return true;
            }
        }
    }

    hasShip(yCoord, xCoord) {
        if (this.board[yCoord][xCoord]['ship'] === false) {
            return false;
        } else {
            return true;
        }
    }

    // hitExists()

    receiveAttack(yCoord, xCoord) {
        const coordinate = this.board[yCoord][xCoord];
        
        if (this.hasShip(yCoord, xCoord)) {
            if (coordinate['isCellHit'] === false) {
                coordinate['isCellHit'] = true;
                coordinate['ship'].hit(yCoord, xCoord);
                this.hits.push([yCoord, xCoord]);
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

    checkXOverlap(yCoord, xCoord, shipLength) {
        for (let i = 0; i < shipLength; i++) {
            if (this.board[yCoord][xCoord+i]['ship'] !== false) {
                //has overlap
                return true;
            }
        }
        //no overlap found
        return false;
    }
    
    checkYOverlap(yCoord, xCoord, shipLength) {
        for (let i = 0; i < shipLength; i++) {
            if (this.board[yCoord+i][xCoord]['ship'] !== false) {
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