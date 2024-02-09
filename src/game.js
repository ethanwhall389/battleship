const Player = require('./components/player');
const GameBoard = require('./components/gameboard');
const DomControl = require('./components/dom-control');
const EventListeners = require('./components/event-listeners');
const PlaceShips = require('./components/place-ships');

class Game {
    constructor(pOneName, pTwoName, dimensions) {
        this.dimensions = dimensions;

        this.playerOne = new Player(pOneName);
        this.playerTwo = new Player(pTwoName);

        this.pOneBoard = new GameBoard(this.dimensions, this.dimensions);
        this.pTwoBoard = new GameBoard(this.dimensions, this.dimensions);
    }

    static async startGame() {
        //show name screen, await name input
        const name = await EventListeners.startGame();
        const game = new Game(name, 'Computer', 10);

        await PlaceShips.userPlaceShips(game.pOneBoard, game.playerOne.name);
        PlaceShips.randomPlaceShips(game.pTwoBoard);

        DomControl.showGame();

        DomControl.displayPlayerNames(game.playerOne, game.playerTwo);
        DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);
        EventListeners.hoverCoordinates();
        game.gameLoop();

    }


    pOneTurn () {
        return new Promise (async resolve => {
            DomControl.enableInput();
            DomControl.updateGameMessage(`${this.playerOne.name}'s turn!`);
            const clickedCell = await EventListeners.inputAttack(this.playerOne, this.pTwoBoard);
            
            DomControl.displayTakeShot(this.playerOne);
            
            setTimeout( () => {
                
                DomControl.attackResponseMessage(clickedCell);
                DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);
                
                setTimeout( () => {
                    resolve();
                }, 1500);

            }, 1000);
            
        })
    }

    pTwoTurn () {
        return new Promise (async resolve => {
            DomControl.updateGameMessage(`${this.playerTwo.name}'s turn!`); 
            DomControl.disableInput();
            
            
            const clickedCell = await this.playerTwo.computerAttack(this.pOneBoard);

            setTimeout( () => {
                DomControl.displayTakeShot(this.playerTwo);
            }, 1000);

            setTimeout( () => {

                DomControl.attackResponseMessage(clickedCell);
                DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);

                setTimeout( () => {
                    resolve();
                }, 1500);

            }, 2000)
        })
    }

    endGame (winningPlayer) {
        DomControl.clearGameMessages();
        DomControl.displayWinner(winningPlayer);
        DomControl.displayAllShips(this.pOneBoard, this.pTwoBoard);
    }

    async gameLoop () {
        //Player one turn
        await this.pOneTurn();

        //check for win
        if (this.pTwoBoard.allShipsSunk()) {
            this.endGame(this.playerOne);
            return;
        }

        //player two turn
        await this.pTwoTurn();

        //check for win
        if (this.pOneBoard.allShipsSunk()) {
            this.endGame(this.playerTwo);
            return;
        }


        //if no win, recursive call gameLoop
        this.gameLoop();
    }
}




Game.startGame();








