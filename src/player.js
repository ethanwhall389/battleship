const GameBoard = require('./gameboard');

class Player {
    constructor(name) {
        this.name = name;
        // this.gameBoard = new GameBoard(10, 10);
    }

    attack(vertCoord, horzCoord, enemyBoard) {
        enemyBoard.receiveAttack(vertCoord, horzCoord);
    }

    computerAttack(enemyBoard) {
        //FOR TESTS ONLY-- use below for production

        const randomVertCoord = Math.floor(Math.random() * 3);
        const randomHorzCoord = Math.floor(Math.random() * 3);
        
        // const randomHorzCoord = Math.floor(Math.random() * 10);
        // const randomVertCoord = Math.floor(Math.random() * 10);

        console.log('randomHorz: ' + randomHorzCoord);
        console.log('randomVert: ' + randomVertCoord);

        if (enemyBoard.board[randomVertCoord][randomHorzCoord] !== 0) {
            if (enemyBoard.hasShip(randomVertCoord, randomHorzCoord)) {
                if (!enemyBoard.board[randomVertCoord][randomHorzCoord].hits.includes([randomVertCoord, randomHorzCoord])) {
                    this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
                }
            }
        } else {
            this.computerAttack(enemyBoard);
        }

    }
}

module.exports = Player;