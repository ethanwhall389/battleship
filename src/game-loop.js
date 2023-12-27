const Player = require('./player');
const GameBoard = require('./gameboard');
const DomControl = require('./dom-control');

console.log('heloooooo');

function newGame() {
    const pOneName = 'Bill';
    const pTwoName = 'Sarah';
    const dimensions = 10;
    
    const playerOne = new Player(pOneName);
    const playerTwo = new Player(pTwoName);
    
    const pOneBoard = new GameBoard(dimensions, dimensions);
    const pTwoBoard = new GameBoard(dimensions, dimensions);

    DomControl.displayBoard(pOneBoard);
    DomControl.displayBoard(pTwoBoard);
}

function displayBoards() {

}

newGame();




