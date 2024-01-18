const Player = require('./player');
const GameBoard = require('./gameboard');
const DomControl = require('./dom-control');
const EventListeners = require('./event-listeners');
const PlaceShips = require('./place-ships');

class Game {
    constructor(pOneName, pTwoName, dimensions) {
        this.dimensions = dimensions;

        this.playerOne = new Player(pOneName);
        this.playerTwo = new Player(pTwoName);

        this.pOneBoard = new GameBoard(this.dimensions, this.dimensions);
        this.pTwoBoard = new GameBoard(this.dimensions, this.dimensions);

        // this.userPlaceShips(this.pOneBoard);
        // this.computerPlaceShips(this.pTwoBoard);

        // DomControl.hidePlaceShips();
        // DomControl.showGame();

        // this.pTwoBoard.placeShip(5, 5, 4, 'horiz');
        // this.pTwoBoard.placeShip(6, 1, 3, 'vert');

        // DomControl.displayPlayerNames(this.playerOne, this.playerTwo);
        // DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);
        // EventListeners.hoverCoordinates();
        // this.gameLoop();
    }

    static async startGame() {
        //show name screen, await name input
        const name = await EventListeners.startGame();
        console.log(name);
        const game = new Game(name, 'Computer', 10);

        await PlaceShips.userPlaceShips(game.pOneBoard);
        PlaceShips.computerPlaceShips(game.pTwoBoard);

        DomControl.showGame();

        DomControl.displayPlayerNames(game.playerOne, game.playerTwo);
        DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);
        EventListeners.hoverCoordinates();
        game.gameLoop();

    }

    // userPlaceShips(gameBoard) {
    //     return new Promise (async resolve => {
    //         DomControl.showPlaceShipsScreen(gameBoard);
    //         EventListeners.hoverCoordinates();
    //         await EventListeners.completePlacing();
    //         resolve();
    //         // setTimeout( () => {
    //         //     resolve();
    //         // }, 10000);
    //     })
    // }

    pOneTurn () {
        return new Promise (async resolve => {
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
            
            //In case of a freeze up, re-call the function to keep game running;
            // setTimeout( () => {
            //     this.pTwoTurn();
            // }, 3000);
            
            const clickedCell = await this.playerTwo.computerAttack(this.pOneBoard);
            console.log('clicked cell:')
            console.log(clickedCell);

            // const clickedCell = await EventListeners.inputAttack(this.pOneBoard);
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
        DomControl.displayWinner(winningPlayer);
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



// const name = EventListeners.startGame();

// console.log(name);

// new Game(name, 'Computer', 10);

Game.startGame();



// DomControl.displayPlayerNames(game.playerOne, game.playerTwo);
// DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);


// EventListeners.inputAttack(game.pOneBoard, game.pTwoBoard);
// EventListeners.hoverCoordinates(game.pOneBoard);





