const Player = require('../player');
const GameBoard = require('../gameboard');

let enemyBoard
beforeEach(() => {
    enemyBoard = new GameBoard(10, 10);

})

const player = new Player('Ethan');


describe('player tests', () => {

    test('Player can attack enemy game board', () => {
        player.attack(5, 5, enemyBoard);
        console.log('enemy board**********************');
        console.log(enemyBoard.board);
        expect(enemyBoard.board[5][5]).toBe(0);
    })

    test('computer can attack randomly', () => {
        player.computerAttack(enemyBoard);
        console.log(enemyBoard.board);
    })

    test('computer does not attack same place twice', () => {
        enemyBoard = new GameBoard(3, 3);
        player.computerAttack(enemyBoard);
        player.computerAttack(enemyBoard);
        player.computerAttack(enemyBoard);
        console.log(enemyBoard.board);
    })


})