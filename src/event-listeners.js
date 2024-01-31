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

    static completePlacing(gameBoard) {
        return new Promise (resolve => {
            const completeBttn = document.querySelector('.complete-placing');
            completeBttn.addEventListener('click', () => {
                if (gameBoard.allShipsPlaced()) {
                    resolve();
                }
            })
        })
    }

    static inputAttack(player, enemyBoard) {
        return new Promise (resolve => {

            document.addEventListener('click', (event) => {
                if (event.target.classList.contains('board-cell')) {

                    const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
                    console.log(coordinates);

                    // console.log(event.target.getAttribute('data-coordinate'));
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

    static ship = {length: 0, selectedShipElem: null, orientation: 'x'};

    static selectShip() {
        
        const ships = document.querySelectorAll('.ship');

        this.addHoverEvents();
        this.changeOrientation();

        ships.forEach((ship) => {
            ship.addEventListener('click', (event) => {
                ships.forEach(ship => {
                    ship.classList.remove('ship-selected');
                })

                ship.classList.add('ship-selected');
                const parent = event.target.parentNode;
                const selectedShip = parent.getAttribute('data');

                this.ship.length = this.calcShipLength(selectedShip);
                this.ship.selectedShipElem = parent;
            })
        })

    }

    static changeOrientation() {
        const orientBttn = document.querySelector('.orientation-bttn');
        orientBttn.addEventListener('click', (event) => {
            if (event.target.classList.contains('orientation-bttn')) {
                if (event.target.getAttribute('data-axis') === 'x') {
                    event.target.setAttribute('data-axis', 'y');
                    event.target.textContent = 'Place on Y axis';
                    this.ship.orientation = 'y';
                } else {
                    event.target.setAttribute('data-axis', 'x');
                    event.target.textContent = 'Place on X axis';
                    this.ship.orientation = 'x';
                }
            }
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
                if (this.ship.orientation === 'x') {
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                    DomControl.showPlacementHover(cellElem);
                } else if (this.ship.orientation === 'y') {
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0] + i}, ${currentCoord[1]}]']`);
                    DomControl.showPlacementHover(cellElem);
                }
            }      
        }
    }

    static mouseOutHandler = (event) => {
        const shipLength = this.ship.length; 
        if (event.target.classList.contains('board-cell')) {
            const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));
            for (let i = 0; i < shipLength; i++) {
                if (this.ship.orientation === 'x') {
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                    DomControl.removePlacementHover(cellElem);
                } else if (this.ship.orientation === 'y') {
                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0] + i}, ${currentCoord[1]}]']`);
                    DomControl.removePlacementHover(cellElem);
                }
                
                // const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);
                // DomControl.removePlacementHover(cellElem);
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
                    let orientation = '';
                    if (this.ship.orientation === 'x') {
                        orientation = 'horiz';
                    } else {
                        orientation = 'vert';
                    }
                    const success = gameBoard.placeShip(vert, horiz, this.ship.length, orientation);
                    if (success === true) {
                        DomControl.updatePlaceShipsBoard(gameBoard);
                        DomControl.disableShipSelection(this.ship.selectedShipElem);
                        this.ship.length = 0;
                    }
                }
            }
        })
    }
}

module.exports = EventListeners;