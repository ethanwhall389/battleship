const GameBoard = require('../gameboard');

let board;
beforeEach(() => {
    board = new GameBoard(100, 100);

})

test('gameboard length and width work', () => {
    expect(board.width && board.height).toBe(100);
})

test('ship is placeable at specific coordinates', () => {

})