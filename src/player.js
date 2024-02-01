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

            
            const smartAttackResult = this.attemptSmartAttack(enemyBoard);

            if (smartAttackResult !== null) {
                resolve(smartAttackResult);
            }
            //FOR TESTS ONLY-- use below for production
    
            // const randomVertCoord = Math.floor(Math.random() * 3);
            // const randomHorzCoord = Math.floor(Math.random() * 3);
            const randomAttackResult = this.randomAttack(enemyBoard);

            if (randomAttackResult !== null) {
                resolve(randomAttackResult);
            }
            
            // const randomHorzCoord = Math.floor(Math.random() * 10);
            // const randomVertCoord = Math.floor(Math.random() * 10);
    
            // if (this.canBeAttacked(enemyBoard, randomVertCoord, randomHorzCoord)) {
            //     this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
            //     console.log('returned enemy board random cells:');
            //     console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
            //     resolve(enemyBoard.board[randomVertCoord][randomHorzCoord]);
            // } else {
            //     this.computerAttack(enemyBoard);
            // }

            // if (!enemyBoard.board[randomVertCoord][randomHorzCoord].isCellMissed ||
            //     !enemyBoard.board[randomVertCoord][randomHorzCoord].isCellHit) {

            //     this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
            //     console.log('returned enemy board random cells:');
            //     console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
            //     resolve(enemyBoard.board[randomVertCoord][randomHorzCoord]);
                
            // } else {
            //     //Keep running random attacks until one satisfies
            //     this.computerAttack(enemyBoard);
            // }
            

        })

    }

    attemptSmartAttack(enemyBoard) {
       
        if (enemyBoard.lastHit !== null) {
            let vertCoord = enemyBoard.lastHit[0];
            let horzCoord = enemyBoard.lastHit[1];
            const coordinate = enemyBoard.board[vertCoord][horzCoord];
            //if ship is hit but not sunk
            if (!coordinate['ship'].isSunk()) {
                if (coordinate['ship'].hits > 1) {
                    //attack to one side
                } else {
                    //attack to any side of hit
                    const axisOptions = ['x', 'y'];
                    const directionOptions = ['+', '-'];

                    const randomAxis = axisOptions[Math.floor(Math.random() * 2)]
                    const randomDirection = directionOptions[Math.floor(Math.random() * 2)]

                    let newVertCoord;
                    let newHorzCoord;
                    if (randomAxis === 'y') {
                        if (randomDirection === '+') {
                            newVertCoord = vertCoord++; 
                            newHorzCoord = horzCoord;
                        } else {
                            newVertCoord = vertCoord--;
                            newHorzCoord = horzCoord;
                        }
                    } else if (randomAxis === 'x') {
                        if (randomDirection === '+') {
                            newHorzCoord = horzCoord++;
                            newVertCoord = vertCoord; 
                        } else {
                            newHorzCoord = horzCoord--;
                            newVertCoord = vertCoord;
                        }
                    }

                    if (this.canBeAttacked(enemyBoard, newVertCoord, newHorzCoord)) {
                        this.attack(newVertCoord, newHorzCoord, enemyBoard);
                        return enemyBoard.board[newVertCoord][newHorzCoord];
                    } else {
                        this.attemptSmartAttack();
                    }
                    //attack new coordinates
                }
            }
        }

        return null;
        //store a last hit value in enemy board


        //if enemy board has a hit and the ship is not sunk
            //if the ship has more than one hit
                //attack to one side
            //attack to any side of hit
    }

    randomAttack(enemyBoard) {
        const randomHorzCoord = Math.floor(Math.random() * 10);
        const randomVertCoord = Math.floor(Math.random() * 10);

        if (this.canBeAttacked(enemyBoard, randomVertCoord, randomHorzCoord)) {
            this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
            console.log('returned enemy board random cells:');
            console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
            return enemyBoard.board[randomVertCoord][randomHorzCoord];
        } else {
            this.randomAttack(enemyBoard);
        }
        return null;
    }

    canBeAttacked(enemyBoard, vertCoord, horzCoord) {
        if (!enemyBoard.board[vertCoord][horzCoord].isCellMissed ||
            !enemyBoard.board[vertCoord][horzCoord].isCellHit) {
            
            return true;            
        } else {
            return false;
        }
    }


}

module.exports = Player;