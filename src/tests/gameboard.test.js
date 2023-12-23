const GameBoard = require('../gameboard');
const Ship = require('../ship');

let board;
beforeEach(() => {
    board = new GameBoard(6, 6);

})


test('gameboard created properly', () => {
    console.log(board.board);
    expect(board.width && board.height).toBe(6);
    expect(typeof(board.board)).toBe('object');
})

test('ship is placeable horizontally', () => {
    board.placeShip(0, 0, 4, 'horiz');
    console.log(board.board);
    expect(board.hasShip(0, 0) && board.hasShip(0,1)).toBe(true);
})

test('ship is placeable vertically', () => {
    board.placeShip(0, 0, 4, 'vert');
    console.log(board.board);
    expect(board.hasShip(0,0) && board.hasShip(1,0)).toBe(true);
})

test('multiple non-overlapping ships placeable', () => {
    board.placeShip(0,0,4,'vert');
    board.placeShip(3,3,3,'horiz');
    expect(board.hasShip(0,0) && board.hasShip(1,0)).toBe(true);
    expect(board.hasShip(3,3) && board.hasShip(3,4)).toBe(true);
})

test('changing ship\'s properties affects all hit ship\'s squares', () => {
    board.placeShip(0, 0, 4, 'horiz');
    board.placeShip(1, 0, 3, 'horiz');
    board.board[0][0].hit();
    console.log(board.board);
    expect(board.board[0][0].hits && board.board[0][1].hits).toBe(1);
})

test('Horizontal ships not placeable if they overflow board boundaries', () => {
    board.placeShip(0, 4, 4, 'horiz');
    console.log(board.board);
    expect(board.hasShip(0,4)).toBe(false);
})

test('Vertical ships not placeable if they overflow board boundaries', () => {
    board.placeShip(4, 0, 4, 'vert');
    console.log(board.board);
    expect(board.hasShip(0,4)).toBe(false);
})

test('Horizontal ships not placeable if they overlap another ship', () => {
    board.placeShip(0,2,4,'vert');
    console.log(board.board);
    board.placeShip(0,1,4,'horiz');
    console.log(board.board);
    expect(board.hasShip(0,1)).toBe(false);
})

test('Verticle ships not placeable if they overlap another ship', () => {
    board.placeShip(0,3,3,'vert');
    console.log(board.board);
    board.placeShip(2,3,3,'vert');
    console.log(board.board);
    expect(board.hasShip(3,3)).toBe(false);
})

