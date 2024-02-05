class DomControl {

    static updateDisplay(pOneBoard, pTwoBoard) {
        const playerBoardElem = document.querySelector('.player-board');
        const enemyBoardElem = document.querySelector('.enemy-board');

        playerBoardElem.textContent = '';
        enemyBoardElem.textContent = '';

        this.displayPlayerBoard(pOneBoard, playerBoardElem);
        this.displayOpponentBoard(pTwoBoard, enemyBoardElem);
    }

    static hideHomeScreen() {
        const homeScreen = document.querySelector('.home-screen');

        homeScreen.style.display = 'none';
    }

    static showPlaceShipsScreen(gameBoard, playerName) {
        const placeShipsScreen = document.querySelector('.place-ships-cont');
        placeShipsScreen.style.display = 'flex';

        const boardElem = document.querySelector('.place-ships-board');
        this.displayPlayerBoard(gameBoard, boardElem);

        const heading = document.querySelector('.place-ships-cont > h1');
        heading.textContent = `Place your ships, ${playerName}`;
    }

    static updatePlaceShipsBoard(gameBoard) {
        const boardElem = document.querySelector('.place-ships-board');
        boardElem.textContent = '';
        this.displayPlayerBoard(gameBoard, boardElem);
    }

    static disableShipSelection(elem) {
        elem.classList.add('disabled-selection');
    }

    static disableInput() {
        document.body.classList.add('user-disabled');
    }
   
    static enableInput() {
        document.body.classList.remove('user-disabled');
    }

    static hidePlaceShips() {
        const placeShipsScreen = document.querySelector('.place-ships-cont');
        placeShipsScreen.style.display = 'none';
    }

    static showGame() {
        const gameScreen = document.querySelector('.game');
        gameScreen.style.display = 'block';
    }

    static displayPlayerNames(playerOne, playerTwo) {
        const pOneName = document.querySelector('.player-one-name');
        const pTwoName = document.querySelector('.player-two-name');
        pOneName.textContent = playerOne.name;
        pTwoName.textContent = playerTwo.name;

    }
    
    static displayPlayerBoard(gameBoard, boardElem) {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                
            const cellElem = document.createElement('div');
            cellElem.classList.add('board-cell');
            cellElem.setAttribute('data-coordinate', `[${i}, ${j}]`)
            cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;
            cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;
            
            this.checkShip(cellElem, gameBoard.board[i][j]);
            this.checkMiss(cellElem, gameBoard.board[i][j]);
            this.checkHit(cellElem, gameBoard.board[i][j]);
            this.checkSunk(cellElem, gameBoard.board[i][j]);
            
            boardElem.appendChild(cellElem);
            }
        }
    }

    static displayOpponentBoard(gameBoard, boardElem) {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {

                const cellElem = document.createElement('div');
                cellElem.classList.add('board-cell');
                cellElem.setAttribute('data-coordinate', `[${i}, ${j}]`);
                cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;
                cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;
                
                this.checkMiss(cellElem, gameBoard.board[i][j]);
                this.checkHit(cellElem, gameBoard.board[i][j]);
                this.checkSunk(cellElem, gameBoard.board[i][j]);

                boardElem.appendChild(cellElem);
            }
        }
    }

    static checkShip(cellElem, coordinate) {
        if (coordinate.ship !== false) {
            cellElem.classList.add('ship-exists');
        }
    }

    static checkMiss(cellElem, coordinate) {
        if (coordinate.isCellMissed === true) {
            cellElem.classList.add('cell-miss');
        }
    }

    static checkHit(cellElem, coordinate) {
        if (coordinate.isCellHit === true) {
            cellElem.classList.add('cell-hit');
        }
    }

    static checkSunk (cellElem, coordinate) {
        if (coordinate.ship.sunk) {
            cellElem.classList.add('ship-sunk');
        } else {
            return;
        }
    }

    static showCoordinate(event) {
        const cellElem = event.target;
        const coord = JSON.parse(event.target.getAttribute('data-coordinate'));
        const coordText = `${coord[0]},${coord[1]}`

        cellElem.textContent = coordText;
    }

    static removeCoordinate(event) {
        const cellElem = event.target;
        cellElem.textContent = '';
    }

    static showPlacementHover(cellElem) {
        if (cellElem) {
            cellElem.classList.add('placement-hover');
        }
    }

    static removePlacementHover(cellElem) {
        if (cellElem) {
            cellElem.classList.remove('placement-hover');
        }
    }

    static updateGameMessage(message) {
        const messageElem = document.createElement('p');
        messageElem.classList.add('game-message');
        const messageCont = document.querySelector('.message-cont');
        messageElem.textContent = message;

        messageCont.textContent = '';
        messageCont.appendChild(messageElem);
    }

    static attackResponseMessage (cell) {
        const messageElem = document.createElement('p');
        const messageCont = document.querySelector('.message-cont');
        if (cell.isCellMissed) {
            messageElem.textContent = 'Miss!';
        } else if (cell.isCellHit && cell.ship.sunk) {
            messageElem.textContent = `${cell.ship.name} hit and sunk!`;
        } else if (cell.isCellHit) {
            messageElem.textContent = 'Hit!';
        }

        messageCont.appendChild(messageElem);
    }

    static displayTakeShot(player) {
        const messageElem = document.createElement('p');
        const messageCont = document.querySelector('.message-cont');

        messageElem.textContent = `${player.name} Shoots...`;
        messageCont.appendChild(messageElem);
    }

    static displayWinner(winner) {
        const messageElem = document.createElement('p');
        const messageCont = document.querySelector('.message-cont');

        messageElem.textContent = `${winner.name} wins!`;
        messageCont.appendChild(messageElem);
    }

    static clearGameMessages() {
        const messageCont = document.querySelector('.message-cont');
        messageCont.textContent = '';
    }

    static placeShipsMessage(message) {
        const messageElem = document.querySelector('.placement-message-cont > .message');
        messageElem.textContent = message;
        setTimeout( () => {
            messageElem.textContent = ''
        }, 4000);
    }
}



module.exports = DomControl;
