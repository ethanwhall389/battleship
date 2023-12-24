const Player = require('../player');
const GameBoard = require('../gameboard');

const enemyBoard = new GameBoard(10, 10);
const player = new Player('Ethan');


describe('player tests', () => {

    test('Player can attack enemy game board', () => {
        player.attack(5, 5, enemyBoard);
        console.log('enemy board**********************');
        console.log(enemyBoard.board);
        expect(enemyBoard.board[5][5]).toBe(0);
    })


})