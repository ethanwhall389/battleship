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
        // const boardsCont = document.querySelector('.boards-main-cont');
        const boardsCont = document.querySelectorAll('.board-cont');
        boardsCont.forEach(board => {
            board.addEventListener('mouseover', (event) => {
                if (event.target.classList.contains('board-cell')) {
                    DomControl.showCoordinate(event);
                }
            })
            
            board.addEventListener('mouseout', (event) => {
                if (event.target.classList.contains('board-cell')) {
                    DomControl.removeCoordinate(event);
                }
            })
        })

    }

    static selectShip() {
            
        const ships = document.querySelectorAll('.ship');

        ships.forEach((ship) => {
            ship.addEventListener('click', (event) => {
                ships.forEach(ship => {
                    ship.classList.remove('ship-selected');
                })

                ship.classList.add('ship-selected');
                const parent = event.target.parentNode;
                const selectedShip = parent.getAttribute('data');
                console.log(selectedShip);

                this.showShipHover(selectedShip);
            })
        })

    }


    static showShipHover(ship) {
        console.log('showShipHover called with ship: ' + ship);
        let shipLength = 0;
        if (ship === 'carrier') {
            shipLength = 5;
        } else if (ship === 'battleship') {
            shipLength = 4;
        } else if (ship === 'cruiser') {
            shipLength = 3;
        } else if (ship === 'submarine') {
            shipLength = 3;
        } else if (ship === 'destroyer') {
            shipLength = 2;
        }
        console.log('ship length: ' + shipLength);

        const mouseOverHandler = (event) => {
            console.log('mouseOver run');
            if (event.target.classList.contains('board-cell')) {
                const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
                // console.clear();
                for (let i = 0; i < shipLength; i++) {
                    // console.log(i);
                    console.log(`${currentCoord[0]}, ${currentCoord[1] + i}`);
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                    DomControl.showPlacementHover(cellElem);
                }

                boardCont.addEventListener('mouseover', mouseOverHandler);
                boardCont.addEventListener('mouseout', mouseOutHandler);        

            }
        }

        const mouseOutHandler = (event) => {
            if (event.target.classList.contains('board-cell')) {

                const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
                for (let i = 0; i < shipLength; i++) {
                    // console.log(currentCoord[0]);
                    // console.log(currentCoord[1] + i);
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                    DomControl.removePlacementHover(cellElem);
                }

                boardCont.removeEventListener('mouseover', mouseOverHandler);
                boardCont.removeEventListener('mouseout', mouseOutHandler);
        
            }
        }

        const boardCont = document.querySelector('.placement-board-cont');
        
        
        boardCont.addEventListener('mouseover', mouseOverHandler);
        boardCont.addEventListener('mouseout', mouseOutHandler);
        
        

    }
}

module.exports = EventListeners;