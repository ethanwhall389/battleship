class DomControl {
    // constructor() {
    //     this.playerBoardElem = document.querySelector('.player-board');
    //     this.enemyBoardElem = document.querySelector('.enemy-board');
    // }

    static updateDisplay(pOneBoard, pTwoBoard) {
        const playerBoardElem = document.querySelector('.player-board');
        const enemyBoardElem = document.querySelector('.enemy-board');

        playerBoardElem.textContent = '';
        enemyBoardElem.textContent = '';

        this.displayBoard(pOneBoard, playerBoardElem);
        this.displayBoard(pTwoBoard, enemyBoardElem);
    }
    
    static displayBoard(gameBoard, boardElem) {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                
            const cellElem = document.createElement('div');
            cellElem.classList.add('board-cell');
            cellElem.setAttribute('data-coordinate', `[${i}, ${j}]`)
            console.log(boardElem.offsetWidth);
            cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;
            cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;
            
            this.checkShip(cellElem, gameBoard.board[i][j]);
            this.checkMiss(cellElem, gameBoard.board[i][j]);
            this.checkHit(cellElem, gameBoard.board[i][j]);
            
            boardElem.appendChild(cellElem);
            }
        }
    }

    static checkShip(cellElem, coordinate) {
        if (coordinate.ship !== false) {
            cellElem.style.backgroundColor = 'blue';
        }
    }

    static checkMiss(cellElem, coordinate) {
        if (coordinate.isCellMissed === true) {
            cellElem.style.backgroundColor = 'gray';
        }
    }

    static checkHit(cellElem, coordinate) {
        if (coordinate.isCellHit === true) {
            cellElem.style.backgroundColor = 'red';
        }
    }

    static showCoordinate(event) {
        const cellElem = event.target;
        // const coordElem = document.createElement('p');
        // coordElem.textContent = event.target.getAttribute('data-coordinate');

        // cellElem.appendChild(coordElem);
        const coord = JSON.parse(event.target.getAttribute('data-coordinate'));
        const coordText = `${coord[0]},${coord[1]}`

        cellElem.textContent = coordText;
    }

    static removeCoordinate(event) {
        const cellElem = event.target;
        cellElem.textContent = '';
    }

    // static inputAttack(playerBoard, enemyBoard) {
    //     document.addEventListener('click', (event) => {
    //         if (event.target.classList.contains('board-cell')) {
    //             // console.log(event.target.getAttribute('data-coordinate'));
    //             const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
    //             console.log(coordinates);
    //             console.log(enemyBoard.board[coordinates[0], coordinates[1]]);
    //             enemyBoard.receiveAttack(coordinates[0], coordinates[1]);
    //             this.updateDisplay(playerBoard, enemyBoard);
    //         }
    //     })
    // }
}



module.exports = DomControl;
