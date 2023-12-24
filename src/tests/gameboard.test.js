const GameBoard = require('../gameboard');
const Ship = require('../ship');

let board;
beforeEach(() => {
    board = new GameBoard(10, 10);

})

describe.skip('gameboard tests', () => {

    test('gameboard created properly', () => {
        console.log(board.board);
        expect(board.width && board.height).toBe(10);
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
        board.board[0][0].hit(0, 0);
        console.log(board.board);
        expect(board.board[0][0].getHitNum() && board.board[0][1].getHitNum()).toBe(1);
    })
    
    test('Horizontal ships not placeable if they overflow board boundaries', () => {
        board.placeShip(0, 8, 4, 'horiz');
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
    
    test('gameboard can record a hit', () => {
        board.placeShip(2,3,3,'vert')
        board.placeShip(5,0,3,'horiz');
        board.receiveAttack(3,3);
        expect(board.board[3][3].getHitNum()).toBe(1);
        console.log(board.board);
    })
    
    test('gameboard can record a miss', () => {
        board.placeShip(2,3,3,'vert');
        board.receiveAttack(4,0);
        expect(board.board[4][0]).toBe(0);
        console.log(board.board);
    })
    
    test('can report all ships are sunk', () => {
        board.placeShip(2,3,2,'vert');
        board.receiveAttack(2,3);
        board.receiveAttack(3,3);
        console.log(board.board);
        expect(board.allShipsSunk()).toBe(true);
    })
    
    test('can report all ships NOT sunk', () => {
        board.placeShip(2,3,3,'vert');
        board.receiveAttack(3,3);
        console.log(board.board);
        expect(board.allShipsSunk()).toBe(false);
    })

})


