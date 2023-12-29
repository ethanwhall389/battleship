class DomControl {
    
    static displayBoard(gameBoard) {
        const boardCont = document.querySelector('.boards-cont');
        const boardElem = document.createElement('div');
        boardElem.classList.add('board');
        boardCont.appendChild(boardElem);
        
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
            console.log(boardElem.offsetWidth);
            cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;
            cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;
            
            this.checkShip(cellElem, gameBoard.board[i][j]);
            // checkMiss();
            // checkHit();
            
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
            cellElem.style.backgroundColor = 'red';
        }
    }
}

module.exports = DomControl;