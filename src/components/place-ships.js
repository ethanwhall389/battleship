const DomControl = require('./dom-control');
const EventListeners = require('./event-listeners');

class PlaceShips {
    
    static userPlaceShips(gameBoard, playerName) {
        return new Promise (async resolve => {
            DomControl.showPlaceShipsScreen(gameBoard, playerName);
            EventListeners.hoverCoordinates();
            EventListeners.selectShip();
            EventListeners.placeShip(gameBoard);
            await EventListeners.completePlacing(gameBoard);
            DomControl.hidePlaceShips();
            resolve();
        })
    }

    static randomPlaceShips(gameBoard) {
        const orientOptions = ['vert', 'horiz'];
        let shipLengths = [5, 4, 3, 3, 2];
        let shipNames = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

        while (shipLengths.length >= 1) {
            const randomVert = Math.floor(Math.random() * 9) + 1;
            const randomHorz = Math.floor(Math.random() * 9) + 1;
            const randomOrient = Math.round(Math.random()); 
            const success = gameBoard.placeShip(randomVert, randomHorz, shipLengths[0], orientOptions[randomOrient], shipNames[0]);
            if (success === true) {
                shipLengths.shift();
                shipNames.shift();
            } else {
            }
        }
    }
}



module.exports = PlaceShips;