class SmartAttack {
    
    static attack(yCoord, xCoord, enemyBoard) {
        enemyBoard.receiveAttack(yCoord, xCoord);
    }
    
    static attemptSmartAttack(enemyBoard) {
        if(enemyBoard.hits.length === 0) {
            //no hits, no smart attack possible
            return null;
        }
        
        let yCoord = enemyBoard.hits[enemyBoard.hits.length - 1][0];
        let xCoord = enemyBoard.hits[enemyBoard.hits.length - 1][1];
        const coordinate = enemyBoard.board[yCoord][xCoord];
        
        if (!coordinate['ship'].isSunk()) { //if ship is hit but not sunk
            
            if (coordinate['ship'].hits > 1) {
                return this.attackAdjacentCell(enemyBoard, yCoord, xCoord)
            } else {
                return this.attackRandomSide(enemyBoard, yCoord, xCoord);
            }
        }

        return null; //smart attack unsuccesful

    }

    static attackAdjacentCell(enemyBoard, yCoord, xCoord) {
        const directionOptions = ['+', '-'];
        const randomDirection = directionOptions[Math.floor(Math.random() * 2)]
        const axis = enemyBoard.board[yCoord][xCoord]['ship'].axis;

        let newXCoord = xCoord;
        let newYCoord = yCoord;

        if (axis === 'x') {
            if (randomDirection === '+') {
                newXCoord = xCoord + 1;
            } else {
                newXCoord = xCoord - 1;
            } 
        }
        else if (axis === 'y') {
            if (randomDirection === '+') {
                newYCoord = yCoord + 1; 
            } else {
                newYCoord = yCoord - 1;
            }
        }

        if(this.canBeAttacked(enemyBoard, newYCoord, newXCoord)) {
            this.attack(newYCoord, newXCoord, enemyBoard);
            return enemyBoard.board[newYCoord][newXCoord];
        } else {
            //if there are any attackable cells adjacent, do not pop. Otherwise, do.
            if (!this.checkAdjacentAttackable(enemyBoard, yCoord, xCoord)) {
                enemyBoard.hits.pop();
            }
            return this.attemptSmartAttack(enemyBoard)
        }
    }

    static attackRandomSide(enemyBoard, yCoord, xCoord) {
        //attack to any random side of hit
        const axisOptions = ['x', 'y'];
        const directionOptions = ['+', '-'];

        const randomAxis = axisOptions[Math.floor(Math.random() * 2)]
        const randomDirection = directionOptions[Math.floor(Math.random() * 2)]

        let newYCoord = yCoord;
        let newXCoord = xCoord;
        if (randomAxis === 'x') {
            if (randomDirection === '+') {
                newYCoord = yCoord + 1; 
            } else {
                newYCoord = yCoord - 1;
            }
        } else if (randomAxis === 'y') {
            if (randomDirection === '+') {
                newXCoord = xCoord + 1;
            } else {
                newXCoord = xCoord - 1;
            }
        }

        if (this.canBeAttacked(enemyBoard, newYCoord, newXCoord)) {
            this.attack(newYCoord, newXCoord, enemyBoard);
            return enemyBoard.board[newYCoord][newXCoord];
        } else {
            return this.attemptSmartAttack(enemyBoard);
        }
    }

    static canBeAttacked(enemyBoard, yCoord, xCoord) {
        
        const cell = enemyBoard.board[yCoord][xCoord];
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

    static checkAdjacentAttackable(enemyBoard, yCoord, xCoord) {
        const coordinate = enemyBoard.board[yCoord][xCoord];

        if (coordinate['ship'].axis === 'y') {
            if (this.canBeAttacked(enemyBoard, yCoord+1, xCoord)) {
                return true;
            } else if (this.canBeAttacked(enemyBoard, yCoord-1, xCoord)) {
                return true;
            }
        } else {
            if (this.canBeAttacked(enemyBoard, yCoord, xCoord+1)) {
                return true;
            } else if (this.canBeAttacked(enemyBoard, yCoord, xCoord-1)) {
                return true;
            }
        }
        return false;
    }
}

module.exports = SmartAttack;