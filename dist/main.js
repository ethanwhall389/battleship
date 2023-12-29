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

eval("class DomControl {\n    \n    static displayBoard(gameBoard) {\n        const boardCont = document.querySelector('.boards-cont');\n        const boardElem = document.createElement('div');\n        boardElem.classList.add('board');\n        boardCont.appendChild(boardElem);\n        \n        //create gameboard div, append to body\n        const board = gameBoard.board;\n        const totalCells = gameBoard.width * gameBoard.height;\n\n        // for (let i = 0; i <totalCells; i++) {\n        //     const cell = document.createElement('div');\n        //     cell.classList.add('board-cell');\n        //     console.log(boardElem.offsetWidth);\n        //     cell.style.width = `${boardElem.clientWidth / gameBoard.width}px`;\n        //     cell.style.height = `${boardElem.clientHeight / gameBoard.height}px`;\n        //     boardElem.appendChild(cell);\n        // }\n\n        for (let i = 0; i < gameBoard.board.length; i++) {\n            for (let j = 0; j < gameBoard.board[i].length; j++) {\n                \n            const cellElem = document.createElement('div');\n            cellElem.classList.add('board-cell');\n            console.log(boardElem.offsetWidth);\n            cellElem.style.width = `${boardElem.clientWidth / gameBoard.width}px`;\n            cellElem.style.height = `${boardElem.clientHeight / gameBoard.height}px`;\n            \n            this.checkShip(cellElem, gameBoard.board[i][j]);\n            // checkMiss();\n            // checkHit();\n            \n            boardElem.appendChild(cellElem);\n            }\n        }\n\n\n        // for (let i = 0; i < board.length; i++) {\n        //     for (let j = 0; j < i.length; j++) {\n        //         const cell = document.createElement('div');\n        //         cell.classList.add('board-cell');\n        //         cell.width = \n        //         //create a child element and append to dom\n        //     }\n        // }\n    }\n\n    static checkShip(cellElem, coordinate) {\n        if (coordinate.ship !== false) {\n            cellElem.style.backgroundColor = 'red';\n        }\n    }\n}\n\nmodule.exports = DomControl;\n\n//# sourceURL=webpack://battleship/./src/dom-control.js?");

/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst DomControl = __webpack_require__(/*! ./dom-control */ \"./src/dom-control.js\");\n\n\nfunction newGame() {\n    const pOneName = 'Bill';\n    const pTwoName = 'Sarah';\n    const dimensions = 10;\n    \n    const playerOne = new Player(pOneName);\n    const playerTwo = new Player(pTwoName);\n    \n    const pOneBoard = new GameBoard(dimensions, dimensions);\n    const pTwoBoard = new GameBoard(dimensions, dimensions);\n\n    pOneBoard.placeShip(4, 2, 4, 'horiz');\n\n    DomControl.displayBoard(pOneBoard);\n    DomControl.displayBoard(pTwoBoard);\n}\n\nnewGame();\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/game-loop.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import Ship from \"./ship\";\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass GameBoard {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n        this.board = this.createBoard();\n    }\n\n    // [\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0],\n    //     [0, 0, 0, 0]\n    // ]\n\n    createBoard() {\n        let array = [];\n        for (let i = 0; i < this.height; i++) {\n            array.push([]);\n        }\n        // const array = new Array(this.height).fill({hasShip: false, isHit: false});\n        for(let i = 0; i < array.length; i++) {\n            for (let j = 0; j < this.width; j++) {\n                array[i].push({isCellHit: false, isCellMissed: false, ship: false});\n            }\n            // array[i] = new Array(this.width).fill({hasShip: false, isHit: false});\n        }\n        return array;\n    }\n\n    //to place ship:\n        // find the coordinate\n        // coordinate = our newly made ship\n\n    placeShip(vertCoord, horzCoord, length, orientation) {\n        const ship = new Ship('Random', length);\n        if (orientation === 'horiz') {\n            //check for horiz board overflow\n            if (horzCoord+length > this.width) {\n                return;\n            } \n            //check for ship overlap\n            else if (this.checkHorizOverlap(vertCoord, horzCoord, length)) {\n                return;\n            }\n            //Place ship\n            else {\n                for (let i = 0; i < length; i++) {\n                    this.board[vertCoord][horzCoord+i]['ship'] = ship;\n                }\n            }\n        } else if (orientation === 'vert') {\n            //check for vertical board overflow\n            if (vertCoord+length > this.height) {\n                return;\n            } \n            //check for vertical ship overlap\n            else if (this.checkVertOverlap(vertCoord, horzCoord, length)) {\n                return;\n            }\n            //Place ship\n            else {\n                for (let i = 0; i < length; i++) {\n                    this.board[vertCoord+i][horzCoord]['ship'] = ship;\n                }\n            }\n        }\n    }\n\n    hasShip(vertCoord, horzCoord) {\n        if (this.board[vertCoord][horzCoord]['ship'] === false) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n\n    // hitExists()\n\n    receiveAttack(vertCoord, horzCoord) {\n        const coordinate = this.board[vertCoord][horzCoord];\n        // console.log('coordinate: ');\n        // console.log(coordinate);\n        if (this.hasShip(vertCoord, horzCoord)) {\n            if (coordinate['isCellHit'] === false) {\n                coordinate['isCellHit'] = true;\n                coordinate['ship'].hit(vertCoord, horzCoord);\n            }\n        } else if (coordinate['isCellMissed'] === false) {\n            coordinate['isCellMissed'] = true;\n        }\n    }\n\n    allShipsSunk() {\n        //traverse the board\n        for (let i = 0; i < this.board.length; i++) {\n            for (let j = 0; j < this.board[i].length; j++) {\n                //check each ship to see if it's sunk\n                const coordinate = this.board[i][j];\n                if (this.hasShip(i, j) && coordinate['ship']['sunk'] === false) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    checkHorizOverlap(vertCoord, horzCoord, shipLength) {\n        for (let i = 0; i < shipLength; i++) {\n            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {\n                //has overlap\n                return true;\n            }\n        }\n        //no overlap found\n        return false;\n    }\n    \n    checkVertOverlap(vertCoord, horzCoord, shipLength) {\n        for (let i = 0; i < shipLength; i++) {\n            if (this.board[vertCoord][horzCoord+i]['ship'] !== false) {\n                //has overlap\n                return true;\n            }\n        }\n        //no overlap found\n        return false;\n    }\n\n    // placeShip(vertCoord, horzCoord, length, angle) {\n    //     const ship = new Ship(length);\n    //     console.log('Helllooooo');\n    //     for (let i = horzCoord; i < length+horzCoord; i++) {\n    //         console.log('Helloooo inside for looooop');\n    //         console.log(this.board[vertCoord][i]);\n    //         console.log(i);\n    //         this.board[vertCoord][i] = ship;\n    //     }\n    // }\n}\n\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nclass Player {\n    constructor(name) {\n        this.name = name;\n        // this.gameBoard = new GameBoard(10, 10);\n    }\n\n    attack(vertCoord, horzCoord, enemyBoard) {\n        enemyBoard.receiveAttack(vertCoord, horzCoord);\n    }\n\n    computerAttack(enemyBoard) {\n        //FOR TESTS ONLY-- use below for production\n\n        const randomVertCoord = Math.floor(Math.random() * 3);\n        const randomHorzCoord = Math.floor(Math.random() * 3);\n        \n        // const randomHorzCoord = Math.floor(Math.random() * 10);\n        // const randomVertCoord = Math.floor(Math.random() * 10);\n\n        // console.log('randomHorz: ' + randomHorzCoord);\n        // console.log('randomVert: ' + randomVertCoord);\n\n        if (enemyBoard.board[randomVertCoord][randomHorzCoord] !== 0) {\n            if (enemyBoard.hasShip(randomVertCoord, randomHorzCoord)) {\n                if (!enemyBoard.board[randomVertCoord][randomHorzCoord].hits.includes([randomVertCoord, randomHorzCoord])) {\n                    this.attack(randomVertCoord, randomHorzCoord, enemyBoard);\n                }\n            }\n        } else {\n            this.computerAttack(enemyBoard);\n        }\n\n    }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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