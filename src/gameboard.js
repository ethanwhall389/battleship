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
                array[i].push({hasShip: false, isHit: false});
            }
            // array[i] = new Array(this.width).fill({hasShip: false, isHit: false});
        }
        return array;
    }

    placeShip(vertCoord, horzCoord, length, angle) {
        const ship = new Ship(length);
        console.log('Helllooooo');
        for (let i = horzCoord; i < length+horzCoord; i++) {
            console.log('Helloooo inside for looooop');
            console.log(this.board[vertCoord][i]);
            console.log(i);
            this.board[vertCoord][i] = ship;
        }
    }
}

module.exports = GameBoard;