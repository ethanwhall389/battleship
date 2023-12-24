const GameBoard = require('./gameboard');

class Player {
    constructor(name) {
        this.name = name;
        // this.gameBoard = new GameBoard(10, 10);
    }

    attack(vertCoord, horzCoord, enemyBoard) {
        enemyBoard.receiveAttack(vertCoord, horzCoord);
    }
}

module.exports = Player;