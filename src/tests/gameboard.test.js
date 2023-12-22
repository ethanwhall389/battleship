const GameBoard = require('../gameboard');

let board;
beforeEach(() => {
    board = new GameBoard(6, 6);

})


test('gameboard created properly', () => {
    console.log(board.board);
    expect(board.width && board.height).toBe(6);
    expect(typeof(board.board)).toBe('object');
})

test('ship is placeable at specific coordinates', () => {
    board.placeShip(5, 5, 'vert');
    console.log(board.board);
    console.log(board.board[5][5]);
    expect(board.board[5][5].hasShip).toBe(true);
    // expect(board.hasShip(5, 5)).toBe(true);
})