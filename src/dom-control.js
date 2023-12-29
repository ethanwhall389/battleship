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
        const boardCont = document.querySelector('.boards-cont');
        
        //create gameboard div, append to body
        const board = gameBoard.board;
        const totalCells = gameBoard.width * gameBoard.height;

        // for (let i = 0; i <totalCells; i++) {
        //     const cell = document.createElement('div');
        //     cell.classList.add('board-cell');
        //     console.log(boardElem.offsetWidth);
        //     cell.style.width = `${boardElem.clientWidth / gameBoard.width}px`;
        //     cell.style.height = `${boardElem.clientHeight / gameBoard.height}px`;
        //     boardElem.appendChild(cell);
        // }

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


        // for (let i = 0; i < board.length; i++) {
        //     for (let j = 0; j < i.length; j++) {
        //         const cell = document.createElement('div');
        //         cell.classList.add('board-cell');
        //         cell.width = 
        //         //create a child element and append to dom
        //     }
        // }
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

    static inputAttack(playerBoard, enemyBoard) {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('board-cell')) {
                // console.log(event.target.getAttribute('data-coordinate'));
                const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));
                console.log(coordinates);
                console.log(enemyBoard.board[coordinates[0], coordinates[1]]);
                enemyBoard.receiveAttack(coordinates[0], coordinates[1]);
                this.updateDisplay(playerBoard, enemyBoard);
            }
        })
    }
}

module.exports = DomControl;