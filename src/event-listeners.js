const DomControl = require('./dom-control');

class EventListeners {
    static inputAttack(enemyBoard) {
        return new Promise (resolve => {

            document.addEventListener('click', (event) => {
                if (event.target.classList.contains('board-cell')) {
                    // console.log(event.target.getAttribute('data-coordinate'));
                    const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
                    console.log(coordinates);
                    enemyBoard.receiveAttack(coordinates[0], coordinates[1]);
                    // DomControl.displayTakeShot(this.playerOne);
                    // DomControl.attackResponseMessage(enemyBoard.board[coordinates[0]][coordinates[1]]);
                    resolve(enemyBoard.board[coordinates[0]][coordinates[1]]);
                }
            })

        })
    }

    static hoverCoordinates(enemyBoard) {
        const boardsCont = document.querySelector('.boards-main-cont');
        boardsCont.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('board-cell')) {
                DomControl.showCoordinate(event);
            }
        })

        boardsCont.addEventListener('mouseout', (event) => {
            if (event.target.classList.contains('board-cell')) {
                DomControl.removeCoordinate(event);
            }
        })
    }
}

module.exports = EventListeners;