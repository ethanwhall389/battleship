class DomControl {
    displayBoard(gameBoard) {
        const board = gameBoard.board;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < i.length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell');
                //create a child element and append to dom
            }
        }
    }
}

module.exports = DomControl;