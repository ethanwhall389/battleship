const Player = require('./player');
const GameBoard = require('./gameboard');
const DomControl = require('./dom-control');


function newGame() {
    const pOneName = 'Bill';
    const pTwoName = 'Sarah';
    const dimensions = 10;
    
    const playerOne = new Player(pOneName);
    const playerTwo = new Player(pTwoName);
    
    const pOneBoard = new GameBoard(dimensions, dimensions);
    const pTwoBoard = new GameBoard(dimensions, dimensions);

    pOneBoard.placeShip(4, 2, 4, 'horiz');

    DomControl.displayBoard(pOneBoard);
    DomControl.displayBoard(pTwoBoard);
}

newGame();




