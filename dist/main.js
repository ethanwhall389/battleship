/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-control.js":
/*!****************************!*\
  !*** ./src/dom-control.js ***!
  \****************************/
/***/ ((module) => {

eval("class DomControl {\n    // constructor() {\n    //     this.playerBoardElem = document.querySelector('.player-board');\n    //     this.enemyBoardElem = document.querySelector('.enemy-board');\n    // }\n\n    static updateDisplay(pOneBoard, pTwoBoard) {\n        const playerBoardElem = document.querySelector('.player-board');\n        const enemyBoardElem = document.querySelector('.enemy-board');\n\n        playerBoardElem.textContent = '';\n        enemyBoardElem.textContent = '';\n\n        this.displayPlayerBoard(pOneBoard, playerBoardElem);\n        this.displayOpponentBoard(pTwoBoard, enemyBoardElem);\n    }\n\n    static hideHomeScreen() {\n        const homeScreen = document.querySelector('.home-screen');\n        // const gameScreen = document.querySelector('.game');\n\n        homeScreen.style.display = 'none';\n        // gameScreen.style.display = 'block';\n        // gameScreen.style.visibility = 'visible';\n    }\n\n    static showPlaceShipsScreen(gameBoard) {\n        const placeShipsScreen = document.querySelector('.place-ships-cont');\n        placeShipsScreen.style.display = 'flex';\n\n        const boardElem = document.querySelector('.place-ships-board');\n        this.displayPlayerBoard(gameBoard, boardElem);\n    }\n\n    static hidePlaceShips() {\n        const placeShipsScreen = document.querySelector('.place-ships-cont');\n        placeShipsScreen.style.display = 'none';\n    }\n\n    static showGame() {\n        const gameScreen = document.querySelector('.game');\n        gameScreen.style.display = 'block';\n    }\n\n    static displayPlayerNames(playerOne, playerTwo) {\n        const pOneName = document.querySelector('.player-one-name');\n        const pTwoName = document.querySelector('.player-two-name');\n        pOneName.textContent = playerOne.name;\n        pTwoName.textContent = playerTwo.name;\n\n    }\n    \n    static displayPlayerBoard(gameBoard, boardElem) {\n        for (let i = 0; i < gameBoard.board.length; i++) {\n            for (let j = 0; j < gameBoard.board[i].length; j++) {\n                \n            const cellElem = document.createElement('div');\n            cellElem.classList.add('board-cell');\n            cellElem.setAttribute('data-coordinate', `[${i}, ${j}]`)\n            // console.log(boardElem.offsetWidth);\n            cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;\n            cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;\n            \n            this.checkShip(cellElem, gameBoard.board[i][j]);\n            this.checkMiss(cellElem, gameBoard.board[i][j]);\n            this.checkHit(cellElem, gameBoard.board[i][j]);\n            \n            boardElem.appendChild(cellElem);\n            }\n        }\n    }\n\n    static displayOpponentBoard(gameBoard, boardElem) {\n        for (let i = 0; i < gameBoard.board.length; i++) {\n            for (let j = 0; j < gameBoard.board[i].length; j++) {\n\n                const cellElem = document.createElement('div');\n                cellElem.classList.add('board-cell');\n                cellElem.setAttribute('data-coordinate', `[${i}, ${j}]`);\n                cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;\n                cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;\n                \n                this.checkMiss(cellElem, gameBoard.board[i][j]);\n                this.checkHit(cellElem, gameBoard.board[i][j]);\n\n                boardElem.appendChild(cellElem);\n            }\n        }\n    }\n\n    static checkShip(cellElem, coordinate) {\n        if (coordinate.ship !== false) {\n            cellElem.style.backgroundColor = 'blue';\n        }\n    }\n\n    static checkMiss(cellElem, coordinate) {\n        if (coordinate.isCellMissed === true) {\n            cellElem.style.backgroundColor = 'gray';\n        }\n    }\n\n    static checkHit(cellElem, coordinate) {\n        if (coordinate.isCellHit === true) {\n            cellElem.style.backgroundColor = 'red';\n        }\n    }\n\n    static showCoordinate(event) {\n        const cellElem = event.target;\n        // const coordElem = document.createElement('p');\n        // coordElem.textContent = event.target.getAttribute('data-coordinate');\n\n        // cellElem.appendChild(coordElem);\n        const coord = JSON.parse(event.target.getAttribute('data-coordinate'));\n        const coordText = `${coord[0]},${coord[1]}`\n\n        cellElem.textContent = coordText;\n    }\n\n    static removeCoordinate(event) {\n        const cellElem = event.target;\n        cellElem.textContent = '';\n    }\n\n    static showPlacementHover(cellElem) {\n        // const cellElem = event.target;\n        cellElem.classList.add('placement-hover');\n        // cellElem.style.backgroundColor = 'blue';\n    }\n\n    static removePlacementHover(cellElem) {\n        // const cellElem = event.target;\n        cellElem.classList.remove('placement-hover');\n    }\n\n    static updateGameMessage(message) {\n        const messageElem = document.querySelector('.message');\n        const messageCont = document.querySelector('.message-cont');\n        messageElem.textContent = message;\n\n        messageCont.textContent = '';\n        messageCont.appendChild(messageElem);\n    }\n\n    static attackResponseMessage (cell) {\n        const messageElem = document.createElement('p');\n        const messageCont = document.querySelector('.message-cont');\n        console.log('cell: ');\n        console.log(cell);\n        if (cell.isCellMissed) {\n            messageElem.textContent = 'Miss!';\n        } else if (cell.isCellHit) {\n            messageElem.textContent = 'Hit!';\n        }\n\n        console.log(messageElem.textContent);\n        messageCont.appendChild(messageElem);\n    }\n\n    static displayTakeShot(player) {\n        const messageElem = document.createElement('p');\n        const messageCont = document.querySelector('.message-cont');\n\n        messageElem.textContent = `${player.name} Shoots...`;\n        messageCont.appendChild(messageElem);\n    }\n\n    static displayWinner(winner) {\n        const messageElem = document.createElement('p');\n        const messageCont = document.querySelector('.message-cont');\n\n        messageElem.textContent = `${winner.name} wins!`;\n        messageCont.appendChild(messageElem);\n    }\n\n    // static inputAttack(playerBoard, enemyBoard) {\n    //     document.addEventListener('click', (event) => {\n    //         if (event.target.classList.contains('board-cell')) {\n    //             // console.log(event.target.getAttribute('data-coordinate'));\n    //             const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));\n    //             console.log(coordinates);\n    //             console.log(enemyBoard.board[coordinates[0], coordinates[1]]);\n    //             enemyBoard.receiveAttack(coordinates[0], coordinates[1]);\n    //             this.updateDisplay(playerBoard, enemyBoard);\n    //         }\n    //     })\n    // }\n}\n\n\n\nmodule.exports = DomControl;\n\n\n//# sourceURL=webpack://battleship/./src/dom-control.js?");

/***/ }),

/***/ "./src/event-listeners.js":
/*!********************************!*\
  !*** ./src/event-listeners.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const DomControl = __webpack_require__(/*! ./dom-control */ \"./src/dom-control.js\");\n\nclass EventListeners {\n\n    static startGame() {\n        const startBttn = document.querySelector('#submit');\n        const nameInput = document.querySelector('#name');\n\n        return new Promise (resolve => {\n            \n            startBttn.addEventListener('click', (event) => {\n                DomControl.hideHomeScreen();\n                event.preventDefault();\n                resolve(nameInput.value);\n            })\n        })\n    }\n\n    static completePlacing() {\n        return new Promise (resolve => {\n            const completeBttn = document.querySelector('.complete-placing');\n            completeBttn.addEventListener('click', () => {\n                resolve();\n            })\n        })\n    }\n\n    static inputAttack(player, enemyBoard) {\n        return new Promise (resolve => {\n\n            document.addEventListener('click', (event) => {\n                if (event.target.classList.contains('board-cell')) {\n                    // console.log(event.target.getAttribute('data-coordinate'));\n                    const coordinates = JSON.parse(event.target.getAttribute('data-coordinate'));\n                    console.log(coordinates);\n                    player.attack(coordinates[0], coordinates[1], enemyBoard);\n                    // enemyBoard.receiveAttack(coordinates[0], coordinates[1]);\n                    // DomControl.displayTakeShot(this.playerOne);\n                    // DomControl.attackResponseMessage(enemyBoard.board[coordinates[0]][coordinates[1]]);\n                    resolve(enemyBoard.board[coordinates[0]][coordinates[1]]);\n                }\n            })\n\n        })\n    }\n\n    static hoverCoordinates(enemyBoard) {\n        // const boardsCont = document.querySelector('.boards-main-cont');\n        const boardsCont = document.querySelectorAll('.board-cont');\n        boardsCont.forEach(board => {\n            board.addEventListener('mouseover', (event) => {\n                if (event.target.classList.contains('board-cell')) {\n                    DomControl.showCoordinate(event);\n                }\n            })\n            \n            board.addEventListener('mouseout', (event) => {\n                if (event.target.classList.contains('board-cell')) {\n                    DomControl.removeCoordinate(event);\n                }\n            })\n        })\n\n    }\n\n    static selectShip() {\n            \n        const ships = document.querySelectorAll('.ship');\n\n        ships.forEach((ship) => {\n            ship.addEventListener('click', (event) => {\n                ships.forEach(ship => {\n                    ship.classList.remove('ship-selected');\n                })\n\n                ship.classList.add('ship-selected');\n                const parent = event.target.parentNode;\n                const selectedShip = parent.getAttribute('data');\n                console.log(selectedShip);\n\n                this.showShipHover(selectedShip);\n            })\n        })\n\n    }\n\n    static showShipHover(ship) {\n        let shipLength = 0;\n        if (ship === 'carrier') {\n            shipLength = 5;\n        } else if (ship === 'battleship') {\n            shipLength = 4;\n        } else if (ship === 'cruiser') {\n            shipLength = 3;\n        } else if (ship === 'submarine') {\n            shipLength = 3;\n        } else if (ship === 'destroyer') {\n            shipLength = 2;\n        }\n        console.log(shipLength);\n\n        const mouseOverHandler = (event) => {\n            if (event.target.classList.contains('board-cell')) {\n\n                const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));\n                // console.clear();\n                for (let i = 0; i < shipLength; i++) {\n                    // console.log(i);\n                    console.log(currentCoord[0]);\n                    console.log(currentCoord[1] + i);\n                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);\n                    DomControl.showPlacementHover(cellElem);\n                }\n\n            }\n            event.stopPropagation()\n        }\n\n        const mouseOutHandler = (event) => {\n            if (event.target.classList.contains('board-cell')) {\n\n                const currentCoord = JSON.parse(event.target.getAttribute('data-coordinate'));\n                for (let i = 0; i < shipLength; i++) {\n                    // console.log(currentCoord[0]);\n                    // console.log(currentCoord[1] + i);\n                    const cellElem = document.querySelector(`[data-coordinate='[${currentCoord[0]}, ${currentCoord[1] + i}]']`);\n                    DomControl.removePlacementHover(cellElem);\n                }\n            }\n        }\n\n        const boardCont = document.querySelector('.placement-board-cont');\n\n        boardCont.removeEventListener('mouseover', mouseOverHandler);\n        boardCont.removeEventListener('mouseout', mouseOutHandler);\n        boardCont.addEventListener('mouseover', mouseOverHandler);\n        boardCont.addEventListener('mouseout', mouseOutHandler);\n\n        \n\n    }\n}\n\nmodule.exports = EventListeners;\n\n//# sourceURL=webpack://battleship/./src/event-listeners.js?");

/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst DomControl = __webpack_require__(/*! ./dom-control */ \"./src/dom-control.js\");\nconst EventListeners = __webpack_require__(/*! ./event-listeners */ \"./src/event-listeners.js\");\nconst PlaceShips = __webpack_require__(/*! ./place-ships */ \"./src/place-ships.js\");\n\nclass Game {\n    constructor(pOneName, pTwoName, dimensions) {\n        this.dimensions = dimensions;\n\n        this.playerOne = new Player(pOneName);\n        this.playerTwo = new Player(pTwoName);\n\n        this.pOneBoard = new GameBoard(this.dimensions, this.dimensions);\n        this.pTwoBoard = new GameBoard(this.dimensions, this.dimensions);\n\n        // this.userPlaceShips(this.pOneBoard);\n        // this.computerPlaceShips(this.pTwoBoard);\n\n        // DomControl.hidePlaceShips();\n        // DomControl.showGame();\n\n        this.pOneBoard.placeShip(4, 2, 4, 'horiz');\n        this.pOneBoard.placeShip(1, 2, 2, 'vert');\n        this.pOneBoard.placeShip(9, 5, 4, 'horiz');\n        this.pTwoBoard.placeShip(5, 5, 4, 'horiz');\n        this.pTwoBoard.placeShip(6, 1, 3, 'vert');\n\n        // DomControl.displayPlayerNames(this.playerOne, this.playerTwo);\n        // DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);\n        // EventListeners.hoverCoordinates();\n        // this.gameLoop();\n    }\n\n    static async startGame() {\n        //show name screen, await name input\n        const name = await EventListeners.startGame();\n        console.log(name);\n        const game = new Game(name, 'Computer', 10);\n\n        await PlaceShips.userPlaceShips(game.pOneBoard);\n\n        DomControl.showGame();\n\n        DomControl.displayPlayerNames(game.playerOne, game.playerTwo);\n        DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);\n        EventListeners.hoverCoordinates();\n        game.gameLoop();\n\n    }\n\n    // userPlaceShips(gameBoard) {\n    //     return new Promise (async resolve => {\n    //         DomControl.showPlaceShipsScreen(gameBoard);\n    //         EventListeners.hoverCoordinates();\n    //         await EventListeners.completePlacing();\n    //         resolve();\n    //         // setTimeout( () => {\n    //         //     resolve();\n    //         // }, 10000);\n    //     })\n    // }\n\n    pOneTurn () {\n        return new Promise (async resolve => {\n            DomControl.updateGameMessage(`${this.playerOne.name}'s turn!`);\n            const clickedCell = await EventListeners.inputAttack(this.playerOne, this.pTwoBoard);\n            \n            DomControl.displayTakeShot(this.playerOne);\n            \n            setTimeout( () => {\n                \n                DomControl.attackResponseMessage(clickedCell);\n                DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);\n                \n                setTimeout( () => {\n                    resolve();\n                }, 1500);\n\n            }, 1000);\n            \n        })\n    }\n\n    pTwoTurn () {\n        return new Promise (async resolve => {\n            DomControl.updateGameMessage(`${this.playerTwo.name}'s turn!`); \n            \n            //In case of a freeze up, re-call the function to keep game running;\n            // setTimeout( () => {\n            //     this.pTwoTurn();\n            // }, 3000);\n            \n            const clickedCell = await this.playerTwo.computerAttack(this.pOneBoard);\n            console.log('clicked cell:')\n            console.log(clickedCell);\n\n            // const clickedCell = await EventListeners.inputAttack(this.pOneBoard);\n            setTimeout( () => {\n                DomControl.displayTakeShot(this.playerTwo);\n            }, 1000);\n\n            setTimeout( () => {\n\n                DomControl.attackResponseMessage(clickedCell);\n                DomControl.updateDisplay(this.pOneBoard, this.pTwoBoard);\n\n                setTimeout( () => {\n                    resolve();\n                }, 1500);\n\n            }, 2000)\n        })\n    }\n\n    endGame (winningPlayer) {\n        DomControl.displayWinner(winningPlayer);\n    }\n\n    async gameLoop () {\n        //Player one turn\n        await this.pOneTurn();\n\n        //check for win\n        if (this.pTwoBoard.allShipsSunk()) {\n            this.endGame(this.playerOne);\n            return;\n        }\n\n        //player two turn\n        await this.pTwoTurn();\n\n        //check for win\n        if (this.pOneBoard.allShipsSunk()) {\n            this.endGame(this.playerTwo);\n            return;\n        }\n\n\n        //if no win, recursive call gameLoop\n        this.gameLoop();\n    }\n}\n\n\n\n// const name = EventListeners.startGame();\n\n// console.log(name);\n\n// new Game(name, 'Computer', 10);\n\nGame.startGame();\n\n\n\n// DomControl.displayPlayerNames(game.playerOne, game.playerTwo);\n// DomControl.updateDisplay(game.pOneBoard, game.pTwoBoard);\n\n\n// EventListeners.inputAttack(game.pOneBoard, game.pTwoBoard);\n// EventListeners.hoverCoordinates(game.pOneBoard);\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/game-loop.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import Ship from \"./ship\";\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass GameBoard {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n        this.board = this.createBoard();\n    }\n\n    // [\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0]\n    // ]\n\n    createBoard() {\n        let array = [];\n        for (let i = 0; i < this.height; i++) {\n            array.push([]);\n        }\n        // const array = new Array(this.height).fill({hasShip: false, isHit: false});\n        for(let i = 0; i < array.length; i++) {\n            for (let j = 0; j < this.width; j++) {\n                array[i].push({isCellHit: false, isCellMissed: false, ship: false});\n            }\n            // array[i] = new Array(this.width).fill({hasShip: false, isHit: false});\n        }\n        return array;\n    }\n\n    //to place ship:\n        // find the coordinate\n        // coordinate = our newly made ship\n\n    placeShip(vertCoord, horzCoord, length, orientation) {\n        const ship = new Ship('Random', length);\n        if (orientation === 'horiz') {\n            //check for horiz board overflow\n            if (horzCoord+length > this.width) {\n                return;\n            } \n            //check for ship overlap\n            else if (this.checkHorizOverlap(vertCoord, horzCoord, length)) {\n                return;\n            }\n            //Place ship\n            else {\n                for (let i = 0; i < length; i++) {\n                    this.board[vertCoord][horzCoord+i]['ship'] = ship;\n                }\n            }\n        } else if (orientation === 'vert') {\n            //check for vertical board overflow\n            if (vertCoord+length > this.height) {\n                return;\n            } \n            //check for vertical ship overlap\n            else if (this.checkVertOverlap(vertCoord, horzCoord, length)) {\n                return;\n            }\n            //Place ship\n            else {\n                for (let i = 0; i < length; i++) {\n                    this.board[vertCoord+i][horzCoord]['ship'] = ship;\n                }\n            }\n        }\n    }\n\n    hasShip(vertCoord, horzCoord) {\n        if (this.board[vertCoord][horzCoord]['ship'] === false) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n\n    // hitExists()\n\n    receiveAttack(vertCoord, horzCoord) {\n        const coordinate = this.board[vertCoord][horzCoord];\n        // console.log('coordinate: ');\n        // console.log(coordinate);\n        if (this.hasShip(vertCoord, horzCoord)) {\n            if (coordinate['isCellHit'] === false) {\n                coordinate['isCellHit'] = true;\n                coordinate['ship'].hit(vertCoord, horzCoord);\n            }\n        } else if (coordinate['isCellMissed'] === false) {\n            coordinate['isCellMissed'] = true;\n        }\n    }\n\n    allShipsSunk() {\n        //traverse the board\n        for (let i = 0; i < this.board.length; i++) {\n            for (let j = 0; j < this.board[i].length; j++) {\n                //check each ship to see if it's sunk\n                const coordinate = this.board[i][j];\n                if (this.hasShip(i, j) && coordinate['ship']['sunk'] === false) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    checkHorizOverlap(vertCoord, horzCoord, shipLength) {\n        for (let i = 0; i < shipLength; i++) {\n            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {\n                //has overlap\n                return true;\n            }\n        }\n        //no overlap found\n        return false;\n    }\n    \n    checkVertOverlap(vertCoord, horzCoord, shipLength) {\n        for (let i = 0; i < shipLength; i++) {\n            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {\n                //has overlap\n                return true;\n            }\n        }\n        //no overlap found\n        return false;\n    }\n\n    // placeShip(vertCoord, horzCoord, length, angle) {\n    //     const ship = new Ship(length);\n    //     console.log('Helllooooo');\n    //     for (let i = horzCoord; i < length+horzCoord; i++) {\n    //         console.log('Helloooo inside for looooop');\n    //         console.log(this.board[vertCoord][i]);\n    //         console.log(i);\n    //         this.board[vertCoord][i] = ship;\n    //     }\n    // }\n}\n\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/place-ships.js":
/*!****************************!*\
  !*** ./src/place-ships.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const DomControl = __webpack_require__(/*! ./dom-control */ \"./src/dom-control.js\");\nconst EventListeners = __webpack_require__(/*! ./event-listeners */ \"./src/event-listeners.js\");\n\nclass PlaceShips {\n    static userPlaceShips(gameBoard) {\n        return new Promise (async resolve => {\n            DomControl.showPlaceShipsScreen(gameBoard);\n            EventListeners.hoverCoordinates();\n            EventListeners.selectShip();\n            await EventListeners.completePlacing();\n            DomControl.hidePlaceShips();\n            resolve();\n            // setTimeout( () => {\n            //     resolve();\n            // }, 10000);\n        })\n    }\n}\n\n\n\nmodule.exports = PlaceShips;\n\n//# sourceURL=webpack://battleship/./src/place-ships.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nclass Player {\n    constructor(name) {\n        this.name = name;\n        // this.gameBoard = new GameBoard(10, 10);\n    }\n\n    attack(vertCoord, horzCoord, enemyBoard) {\n        enemyBoard.receiveAttack(vertCoord, horzCoord);\n    }\n\n    computerAttack(enemyBoard) {\n        return new Promise ( resolve => {\n\n            //FOR TESTS ONLY-- use below for production\n    \n            // const randomVertCoord = Math.floor(Math.random() * 3);\n            // const randomHorzCoord = Math.floor(Math.random() * 3);\n            \n            const randomHorzCoord = Math.floor(Math.random() * 10);\n            const randomVertCoord = Math.floor(Math.random() * 10);\n    \n            // console.log('randomHorz: ' + randomHorzCoord);\n            // console.log('randomVert: ' + randomVertCoord);\n\n            console.log('random coordinate chosen:');\n            console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);\n    \n            if (!enemyBoard.board[randomVertCoord][randomHorzCoord].isCellMissed) {\n                if (!enemyBoard.board[randomVertCoord][randomHorzCoord].isCellHit) {\n                    this.attack(randomVertCoord, randomHorzCoord, enemyBoard);\n                    console.log('returned enemy board random cells:');\n                    console.log(enemyBoard.board[randomVertCoord][randomHorzCoord]);\n                    resolve(enemyBoard.board[randomVertCoord][randomHorzCoord]);\n                }\n            } else {\n                //Keep running random attacks until one satisfies\n                this.computerAttack(enemyBoard);\n            }\n            \n\n        })\n\n    }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("class Ship {\n    constructor(name, length) {\n        this.name = name;\n        this.length = length;\n        this.hits = 0;\n        this.sunk = false;\n    }\n\n    hit(vertCoord, horzCoord) {\n        this.hits++;\n        // this.hits.push([vertCoord, horzCoord]);\n        this.isSunk();\n    }\n\n    //WORK on checking for hits\n    hitExists(hitsArray, vertCoord, horzCoord) {\n        hitsArray.some(arr => {\n\n        })\n    }\n\n    isSunk() {\n        if (this.hits < this.length) {\n            this.sunk = false;\n            return false;\n        } else {\n            this.sunk = true;\n            return true;\n        }\n    }\n\n    getHitNum() {\n        return this.hits.length;\n    }\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game-loop.js");
/******/ 	
/******/ })()
;