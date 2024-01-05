const DomControl = require('./dom-control');

class EventListeners {

    static startGame() {
        const startBttn = document.querySelector('#submit');
        const nameInput = document.querySelector('#name');

        return new Promise (resolve => {
            
            startBttn.addEventListener('click', (event) => {
                DomControl.hideHomeScreen();
                event.preventDefault();
                resolve(nameInput.value);
            })
        })
    }

    static completePlacing() {
        return new Promise (resolve => {
            const completeBttn = document.querySelector('.complete-placing');
            completeBttn.addEventListener('click', () => {
                resolve();
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

    static selectShip() {
        const ships = document.querySelectorAll('.ship');

        ships.forEach((ship) => {
            ship.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                ships.forEach(ship => {
                    ship.classList.remove('ship-selected');
                })

                ship.classList.add('ship-selected');
                const parent = event.target.parentNode;
                const selectedShip = parent.getAttribute('data');
                console.log(selectedShip);
            })
        })
    }
}

module.exports = EventListeners;