const GameBoard = require('./gameboard');

class Player {
    constructor(name) {
        this.name = name;
    }

    attack(vertCoord, horzCoord, enemyBoard) {
        enemyBoard.receiveAttack(vertCoord, horzCoord);
    }

    computerAttack(enemyBoard) {
        return new Promise ( resolve => {

            
            const smartAttackResult = this.attemptSmartAttack(enemyBoard);

            if (smartAttackResult !== null) {
                resolve(smartAttackResult);
                return;
            }
            //FOR TESTS ONLY-- use below for production
    
            // const randomVertCoord = Math.floor(Math.random() * 3);
            // const randomHorzCoord = Math.floor(Math.random() * 3);
            const randomAttackResult = this.randomAttack(enemyBoard);

            if (randomAttackResult !== null) {
                resolve(randomAttackResult);
                return;
            } else {
            }

        })

    }

    attemptSmartAttack(enemyBoard) {
        if (enemyBoard.hits.length > 0) {
            let vertCoord = enemyBoard.hits[enemyBoard.hits.length - 1][0];
            let horzCoord = enemyBoard.hits[enemyBoard.hits.length - 1][1];
            const coordinate = enemyBoard.board[vertCoord][horzCoord];
            
            //if ship is hit but not sunk
            if (!coordinate['ship'].isSunk()) {
                
                if (coordinate['ship'].hits > 1) {
                    //attack to one side
                    
                    const directionOptions = ['+', '-'];
                    const randomDirection = directionOptions[Math.floor(Math.random() * 2)]

                    let newHorzCoord;
                    let newVertCoord;

                    if (coordinate['ship'].axis === 'horiz') {
                        if (randomDirection === '+') {
                            newHorzCoord = horzCoord + 1;
                            newVertCoord = vertCoord; 
                        } else {
                            newHorzCoord = horzCoord - 1;
                            newVertCoord = vertCoord;
                        } 
                    }
                    else if (coordinate['ship'].axis === 'vert') {
                        if (randomDirection === '+') {
                            newVertCoord = vertCoord + 1; 
                            newHorzCoord = horzCoord;
                        } else {
                            newVertCoord = vertCoord - 1;
                            newHorzCoord = horzCoord;
                        }
                    }

                    if(this.canBeAttacked(enemyBoard, newVertCoord, newHorzCoord)) {
                        this.attack(newVertCoord, newHorzCoord, enemyBoard);
                        return enemyBoard.board[newVertCoord][newHorzCoord];
                    } else {
                        //if there are any attackable cells adjacent, do not pop. Otherwise, do.
                        if (!this.checkAdjacentAttackable(enemyBoard, vertCoord, horzCoord)) {
                            enemyBoard.hits.pop();
                        }
                        return this.attemptSmartAttack(enemyBoard)
                    }


                } else {
                    //attack to any random side of hit
                    const axisOptions = ['x', 'y'];
                    const directionOptions = ['+', '-'];

                    const randomAxis = axisOptions[Math.floor(Math.random() * 2)]
                    const randomDirection = directionOptions[Math.floor(Math.random() * 2)]

                    let newVertCoord;
                    let newHorzCoord;
                    if (randomAxis === 'x') {
                        if (randomDirection === '+') {
                            newVertCoord = vertCoord + 1; 
                            newHorzCoord = horzCoord;
                        } else {
                            newVertCoord = vertCoord - 1;
                            newHorzCoord = horzCoord;
                        }
                    } else if (randomAxis === 'y') {
                        if (randomDirection === '+') {
                            newHorzCoord = horzCoord + 1;
                            newVertCoord = vertCoord; 
                        } else {
                            newHorzCoord = horzCoord - 1;
                            newVertCoord = vertCoord;
                        }
                    }

                    if (this.canBeAttacked(enemyBoard, newVertCoord, newHorzCoord)) {
                        this.attack(newVertCoord, newHorzCoord, enemyBoard);
                        return enemyBoard.board[newVertCoord][newHorzCoord];
                    } else {
                        return this.attemptSmartAttack(enemyBoard);
                    }
                }
            }
        }

        //smart attack unsuccesful
        return null;
    }

    randomAttack(enemyBoard) {
        const randomHorzCoord = Math.floor(Math.random() * 10);
        const randomVertCoord = Math.floor(Math.random() * 10);

        if (this.canBeAttacked(enemyBoard, randomVertCoord, randomHorzCoord)) {
            this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
            return enemyBoard.board[randomVertCoord][randomHorzCoord];
        } else {
            return this.randomAttack(enemyBoard);
        }
    }

    canBeAttacked(enemyBoard, vertCoord, horzCoord) {
        
        const cell = enemyBoard.board[vertCoord][horzCoord];
        if (cell.isCellMissed) {
            return false;
        } 
        else if (cell.isCellHit) {
            return false;
        }
        else {
            return true;
        }
    }

    checkAdjacentAttackable(enemyBoard, vertCoord, horzCoord) {
        const coordinate = enemyBoard.board[vertCoord][horzCoord];

        if (coordinate['ship'].axis === 'vert') {
            if (this.canBeAttacked(enemyBoard, vertCoord+1, horzCoord)) {
                return true;
            } else if (this.canBeAttacked(enemyBoard, vertCoord-1, horzCoord)) {
                return true;
            }
        } else {
            if (this.canBeAttacked(enemyBoard, vertCoord, horzCoord+1)) {
                return true;
            } else if (this.canBeAttacked(enemyBoard, vertCoord, horzCoord-1)) {
                return true;
            }
        }
        return false;
    }

}

module.exports = Player;