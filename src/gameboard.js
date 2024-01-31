// import Ship from "./ship";
const Ship = require('./ship');

class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = this.createBoard();
        this.shipsNum = 0;
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

    placeShip(vertCoord, horzCoord, length, orientation, name) {
        // console.log('Ship that is being placed is: ' + length + ' units long');
        const ship = new Ship(name, length);
        console.log('orientation: ' + orientation);
        if (orientation === 'horiz') {
            //check for horiz board overflow
            console.log('checking for horiz overflow...');
            console.log(`horzCoord: ${vertCoord}`);
            console.log('length: ' + length);
            if (horzCoord+length-1 > this.width-1) {
                console.log('horz overflow FOUND')
                return false;
            } 
            //check for ship overlap
            else if (this.checkHorizOverlap(vertCoord, horzCoord, length)) {
                console.log('horz overlap FOUND')
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord][horzCoord+i]['ship'] = ship;
                }
                this.shipsNum++;
                console.log(`Ship placed at ${vertCoord}, ${horzCoord}, ${orientation}, length of ${length}`)
                return true;
            }
        } else if (orientation === 'vert') {
            //check for vertical board overflow
            console.log('checking for vert overflow...');
            console.log(`vertCoord: ${vertCoord}`);
            console.log('length: ' + length);
            console.log(`vertcoord + length - 1 = ${vertCoord+length-1}`)
            if (vertCoord+length-1 > this.height-1) {
                console.log('vert overflow FOUND')
                return false;
            } 
            //check for vertical ship overlap
            else if (this.checkVertOverlap(vertCoord, horzCoord, length)) {
                console.log('vert overlap FOUND')
                return false;
            }
            //Place ship
            else {
                for (let i = 0; i < length; i++) {
                    this.board[vertCoord+i][horzCoord]['ship'] = ship;
                }
                this.shipsNum++;
                console.log(`Ship placed at ${vertCoord}, ${horzCoord}, ${orientation}, length of ${length}`)
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
            console.log(`coord: ${vertCoord}, ${horzCoord+i}`);
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
            console.log(`coord: ${vertCoord+i}, ${horzCoord}`);
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