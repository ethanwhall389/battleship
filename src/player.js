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
                console.log('attempting to resolve with smart attack')
                resolve(smartAttackResult);
                return;
            }
            //FOR TESTS ONLY-- use below for production
    
            // const randomVertCoord = Math.floor(Math.random() * 3);
            // const randomHorzCoord = Math.floor(Math.random() * 3);
            const randomAttackResult = this.randomAttack(enemyBoard);

            if (randomAttackResult !== null) {
                console.log('attempting to resolve with random attack')
                resolve(randomAttackResult);
                return;
            } else {
                console.log('Random attack DID return null, now we are frozen');
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
        console.log('attempting smart attack')
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


                    
                    //save all previous hits in a stack.
                    //using top hit and hit before, determine which axis to follow
                        //Randomly choose + or -
                        //check if chosen cell can be attacked
                            //Yes? Attack
                            //No? pop coordinate off of stack and run again 
                } else {
                    //attack to any random side of hit
                    const axisOptions = ['x', 'y'];
                    const directionOptions = ['+', '-'];

                    const randomAxis = axisOptions[Math.floor(Math.random() * 2)]
                    const randomDirection = directionOptions[Math.floor(Math.random() * 2)]

                    console.log(`options chosen: ${randomAxis}, ${randomDirection}`);

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
                    //attack new coordinates
                }
            }
        }

        console.log('Smart attack uncuccesful');
        return null;
        //store a last hit value in enemy board


        //if enemy board has a hit and the ship is not sunk
            //if the ship has more than one hit
                //attack to one side
            //attack to any side of hit
    }

    randomAttack(enemyBoard) {
        console.log('attempting random attack')
        const randomHorzCoord = Math.floor(Math.random() * 10);
        const randomVertCoord = Math.floor(Math.random() * 10);
        console.log(`random coordinates chosen: ${randomHorzCoord}, ${randomVertCoord}`);

        if (this.canBeAttacked(enemyBoard, randomVertCoord, randomHorzCoord)) {
            console.log('attacking random coordinate');
            this.attack(randomVertCoord, randomHorzCoord, enemyBoard);
            console.log('returned enemy board random cells:');
            console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);
            return enemyBoard.board[randomVertCoord][randomHorzCoord];
        } else {
            console.log('running random attack again');
            return this.randomAttack(enemyBoard);
        }
        
        console.log('random attack unsuccesful');
        return null;
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

        // if (!enemyBoard.board[vertCoord][horzCoord].isCellMissed ||
        //     !enemyBoard.board[vertCoord][horzCoord].isCellHit) {
            
        //     return true;            
        // } else {
        //     return false;
        // }
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