const DomControl = require('./dom-control');

class EventListeners {
    static inputAttack(playerBoard, enemyBoard) {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('board-cell')) {
                // console.log(event.target.getAttribute('data-coordinate'));
                const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
                console.log(coordinates);
                console.log(enemyBoard.board[coordinates[0], coordinates[1]]);
                enemyBoard.receiveAttack(coordinates[0], coordinates[1]);
                DomControl.updateDisplay(playerBoard, enemyBoard);
            }
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