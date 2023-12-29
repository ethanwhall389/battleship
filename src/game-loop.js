const Player = require('./player');
const GameBoard = require('./gameboard');
const DomControl = require('./dom-control');

class Game {
    constructor(pOneName, pTwoName, dimensions) {
        this.pOneName = pOneName;
        this.pTwoName = pTwoName;
        this.dimensions = dimensions;

        this.playerOne - new Player(this.pOneName);
        this.playerTwo = new Player(this.pTwoName);

        this.pOneBoard = new GameBoard(this.dimensions, this.dimensions)
        this.pTwoBoard = new GameBoard(this.dimensions, this.dimensions)
    }

}

const game = new Game('Bill', 'Sarah', 10);

game.pOneBoard.placeShip(4, 2, 4, 'horiz');
game.pOneBoard.placeShip(1, 2, 2, 'vert');

game.pTwoBoard.placeShip(5, 5, 4, 'horiz');

game.pOneBoard.receiveAttack(7, 5);
game.pTwoBoard.receiveAttack(2, 1);

game.pOneBoard.receiveAttack(4, 2);

DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);

// DomControl.displayBoard(game.pOneBoard);
// DomControl.displayBoard(game.pTwoBoard);

DomControl.inputAttack(game.pOneBoard, game.pTwoBoard);

// function newGame() {
//     // const pOneName = 'Bill';
//     // const pTwoName = 'Sarah';
//     // const dimensions = 10;
    
//     // const playerOne = new Player(pOneName);
//     // const playerTwo = new Player(pTwoName);
    
//     // const pOneBoard = new GameBoard(dimensions, dimensions);
//     // const pTwoBoard = new GameBoard(dimensions, dimensions);

//     pOneBoard.placeShip(4, 2, 4, 'horiz');
//     pOneBoard.placeShip(1, 2, 2, 'vert');

//     pTwoBoard.placeShip(5, 5, 4, 'horiz');

//     pOneBoard.receiveAttack(7, 5);
//     pTwoBoard.receiveAttack(2, 1);

//     pOneBoard.receiveAttack(4, 2);

//     DomControl.displayBoard(pOneBoard);
//     DomControl.displayBoard(pTwoBoard);
// }



// newGame();




