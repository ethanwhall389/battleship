const DomControl = require('./dom-control');

class EventListeners {

    static startGame() {
        const startBttn = document.querySelector('#submit');
        const nameInput = document.querySelector('#name');
        const homeScreen = document.querySelector('.home-screen');
        const gameScreen = document.querySelector('.game');

        return new Promise (resolve => {
            
            startBttn.addEventListener('click', (event) => {
                event.preventDefault();
                homeScreen.style.display = 'none';
                // gameScreen.style.display = 'block';
                gameScreen.style.visibility = 'visible';
                resolve(nameInput.value);
            })
        })
    }

    static inputAttack(player, enemyBoard) {
        return new Promise (resolve => {

            document.addEventListener('click', (event) => {
                if (event.target.classList.contains('board-cell')) {
                    // console.log(event.target.getAttribute('data-coordinate'));
                    const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
                    console.log(coordinates);
                    player.attack(coordinates[0], coordinates[1], enemyBoard);
                    // enemyBoard.receiveAttack(coordinates[0], coordinates[1]);
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