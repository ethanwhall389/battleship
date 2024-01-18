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

    static ship = {length: 0};

    static selectShip() {
        
        const ships = document.querySelectorAll('.ship');

        this.addHoverEvents();

        ships.forEach((ship) => {
            ship.addEventListener('click', (event) => {
                ships.forEach(ship => {
                    ship.classList.remove('ship-selected');
                })

                ship.classList.add('ship-selected');
                const parent = event.target.parentNode;
                const selectedShip = parent.getAttribute('data');

                this.ship.length = this.calcShipLength(selectedShip);
            })
        })

    }

    static calcShipLength(ship) {
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
        return shipLength;
    }

    static mouseOverHandler = (event) => {
        const shipLength = this.ship.length;
        if (event.target.classList.contains('board-cell')) {
            const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
            for (let i = 0; i < shipLength; i++) {
                const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                DomControl.showPlacementHover(cellElem);
            }      
        }
    }

    static mouseOutHandler = (event) => {
        const shipLength = this.ship.length; 
        if (event.target.classList.contains('board-cell')) {
            const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
            for (let i = 0; i < shipLength; i++) {
                const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                DomControl.removePlacementHover(cellElem);
            }
        }
    }
    
    static addHoverEvents(shipLength) {
        const boardCont = document.querySelector('.placement-board-cont');
        boardCont.addEventListener('mouseover', event =>  this.mouseOverHandler(event));
        boardCont.addEventListener('mouseout', event => this.mouseOutHandler(event));
    }

    static placeShip(gameBoard) {
        const boardCont = document.querySelector('.placement-board-cont');
        boardCont.addEventListener('click', (event) => {
            if (event.target.classList.contains('board-cell')) {
                if (this.ship.length !== 0) {
                    const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
                    const vert = currentCoord[0];
                    const horiz = currentCoord[1];
                    gameBoard.placeShip(vert, horiz, this.ship.length, 'horiz');
                    DomControl.updatePlaceShipsBoard(gameBoard);
                }
            }
        })
    }
}

module.exports = EventListeners;