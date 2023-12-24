const { experiments } = require('webpack');
const Ship = require('../ship');

let testShip;

describe('ship tests', () => {

    beforeEach(() => {
        testShip = new Ship('Random', 2);
    })
    
    test('records a hit', () => {
        testShip.hit();
        expect(testShip.getHitNum()).toBe(1);
    })
    
    test('records more than one hit', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.getHitNum()).toBe(2);
    })
    
    test('records sunk if total length is hit', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    })

})
