const Player = require('./player');
const GameBoard = require('./gameboard');
const DomControl = require('./dom-control');
const EventListeners = require('./event-listeners');

class Game {
    constructor(pOneName, pTwoName, dimensions) {
        this.dimensions = dimensions;

        this.playerOne = new Player(pOneName);
        this.playerTwo = new Player(pTwoName);

        this.pOneBoard = new GameBoard(this.dimensions, this.dimensions)
        this.pTwoBoard = new GameBoard(this.dimensions, this.dimensions)

        this.pOneBoard.placeShip(4, 2, 4, 'horiz');
        this.pOneBoard.placeShip(1, 2, 2, 'vert');
        this.pOneBoard.placeShip(9, 5, 4, 'horiz');
        this.pTwoBoard.placeShip(5, 5, 4, 'horiz');
        this.pTwoBoard.placeShip(6, 1, 3, 'vert');

        DomControl.displayPlayerNames(this.playerOne, this.playerTwo);
        DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);
        EventListeners.hoverCoordinates();
        this.gameLoop();
    }

    pOneTurn () {
        return new Promise (async resolve => {
            DomControl.updateGameMessage(`${this.playerOne.name}'s turn!`);
            await EventListeners.inputAttack(this.pTwoBoard);
            DomControl.displayTakeShot(this.playerOne);
            setTimeout( () => {
                DomControl.attackResponseMessage()
            })
            DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);
            setTimeout( () => {
                resolve();
            }, 1500);
        })
    }

    pTwoTurn () {
        return new Promise (resolve => {
            DomControl.updateGameMessage(`${this.playerTwo.name}'s turn!`);   
            EventListeners.inputAttack(this.pOneBoard);
            setTimeout( () => {
                resolve();
            }, 2000);
        })
    }

    async gameLoop () {
        //Player one turn
        await this.pOneTurn();

        //check for win
        await this.pTwoTurn();
        DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);

        //player two turn
        //check for win
        //if no win, recursive call gameLoop
    }
}

const name = prompt('What is your name?');

const game = new Game(name, 'Computer', 10);



// DomControl.displayPlayerNames(game.playerOne, game.playerTwo);
// DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);


// EventListeners.inputAttack(game.pOneBoard, game.pTwoBoard);
// EventListeners.hoverCoordinates(game.pOneBoard);





