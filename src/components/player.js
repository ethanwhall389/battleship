const SmartAttack = require('./smart-attack');

class Player {
    constructor(name) {
        this.name = name;
    }

    attack(yCoord, xCoord, enemyBoard) {
        enemyBoard.receiveAttack(yCoord, xCoord);
    }

    computerAttack(enemyBoard) {
        return new Promise ( resolve => {

            
            const smartAttackResult = SmartAttack.attemptSmartAttack(enemyBoard);

            if (smartAttackResult !== null) {
                resolve(smartAttackResult);
                return;
            }

            const randomAttackResult = this.randomAttack(enemyBoard);

            if (randomAttackResult !== null) {
                resolve(randomAttackResult);
                return;
            }

        })

    }

    randomAttack(enemyBoard) {
        const randomxCoord = Math.floor(Math.random() * 10);
        const randomyCoord = Math.floor(Math.random() * 10);

        if (SmartAttack.canBeAttacked(enemyBoard, randomyCoord, randomxCoord)) {
            this.attack(randomyCoord, randomxCoord, enemyBoard);
            return enemyBoard.board[randomyCoord][randomxCoord];
        } else {
            return this.randomAttack(enemyBoard);
        }
    }

}

module.exports = Player;
