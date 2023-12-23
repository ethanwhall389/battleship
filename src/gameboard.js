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
                array[i].push(null);
            }
            // array[i] = new Array(this.width).fill({hasShip: false, isHit: false});
        }
        return array;
    }

    //to place ship:
        // find the coordinate
        // coordinate = our newly made ship

    placeShip(vertCoord, horzCoord, length, orientation) {
        const ship = new Ship(3);
        if (orientation === 'horiz') {
            for (let i = 0; i < length; i++) {
                this.board[vertCoord][horzCoord+i] = ship;
            }
        } else if (orientation === 'vert') {
            for (let i = 0; i < length; i++) {
                this.board[vertCoord+i][horzCoord] = ship;
            }
        }
    }

    hasShip(vertCoord, horzCoord) {
        if (this.board[vertCoord][horzCoord] !== null) {
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