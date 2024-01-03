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
        return new Promise ( resolve => {

            //FOR TESTS ONLY-- use below for production
    
            // const randomVertCoord = Math.floor(Math.random() * 3);
            // const randomHorzCoord = Math.floor(Math.random() * 3);
            
            const randomHorzCoord = Math.floor(Math.random() * 10);
            const randomVertCoord = Math.floor(Math.random() * 10);
    
            // console.log('randomHorz: ' + randomHorzCoord);
            // console.log('randomVert: ' + randomVertCoord);

            console.log('random coordinate chosen:');
            console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
    
            if (!enemyBoard.board[randomVertCoord][randomHorzCoord].isCellMissed) {
                if (!enemyBoard.board[randomVertCoord][randomHorzCoord].isCellHit) {
                    this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
                    console.log('returned enemy board random cells:');
                    console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
                    resolve(enemyBoard.board[randomVertCoord][randomHorzCoord]);
                }
            } else {
                //Keep running random attacks until one satisfies
                this.computerAttack(enemyBoard);
            }
            

        })

    }
}

module.exports = Player;