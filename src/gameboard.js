// import Ship from "./ship";
const Ship = require('./ship');

class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = this.createBoard();
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
        // const array = new Array(this.height).fill({hasShip: false, isHit: false});
        for(let i = 0; i < array.length; i++) {
            for (let j = 0; j < this.width; j++) {
                array[i].push({isCellHit: false, isCellMissed: false, ship: false});
            }
            // array[i] = new Array(this.width).fill({hasShip: false, isHit: false});
        }
        return array;
    }

    //to place ship:
        // find the coordinate
        // coordinate = our newly made ship

    placeShip(vertCoord, horzCoord, length, orientation) {
        const ship = new Ship('Random', length);
        if (orientation === 'horiz') {
            //check for horiz board overflow
            if (horzCoord+length > this.width) {
                return;
            } 
            //check for ship overlap
            else if (this.checkHorizOverlap(vertCoord, horzCoord, length)) {
                return;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord][horzCoord+i]['ship'] = ship;
                }
            }
        } else if (orientation === 'vert') {
            //check for vertical board overflow
            if (vertCoord+length > this.height) {
                return;
            } 
            //check for vertical ship overlap
            else if (this.checkVertOverlap(vertCoord, horzCoord, length)) {
                return;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord+i][horzCoord]['ship'] = ship;
                }
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
        console.log('coordinate: ');
        console.log(coordinate);
        if (this.hasShip(vertCoord, horzCoord)) {
            if (coordinate['isCellHit'] === false) {
                coordinate['isCellHit'] = true;
                coordinate['ship'].hit(vertCoord, horzCoord);
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
            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {
                //has overlap
                return true;
            }
        }
        //no overlap found
        return false;
    }

    // placeShip(vertCoord, horzCoord, length, angle) {
    //     const ship = new Ship(length);
    //     console.log('Helllooooo');
    //     for (let i = horzCoord; i < length+horzCoord; i++) {
    //         console.log('Helloooo inside for looooop');
    //         console.log(this.board[vertCoord][i]);
    //         console.log(i);
    //         this.board[vertCoord][i] = ship;
    //     }
    // }
}

module.exports = GameBoard;