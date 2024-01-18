const DomControl = require('./dom-control');
const EventListeners = require('./event-listeners');

class PlaceShips {
    static userPlaceShips(gameBoard) {
        return new Promise (async resolve => {
            DomControl.showPlaceShipsScreen(gameBoard);
            EventListeners.hoverCoordinates();
            EventListeners.selectShip();
            EventListeners.placeShip(gameBoard);
            await EventListeners.completePlacing();
            DomControl.hidePlaceShips();
            resolve();
        })
    }

    static computerPlaceShips(gameBoard) {
        const orientOptions = ['vert', 'horiz'];
        let shipLengths = [5, 4, 3, 3, 2];

        while (shipLengths.length >= 1) {
            const randomVert = Math.floor(Math.random() * 9);
            const randomHorz = Math.floor(Math.random() * 9);
            const randomOrient = Math.floor(Math.random() * 2);    
            const success = gameBoard.placeShip(randomVert, randomHorz, shipLengths[0], orientOptions[randomOrient] )
            if (success === true) {
                console.log('ship placed');
                shipLengths.shift();
            } else {
                console.log('ship not placed');
            }
        }
    }
}



module.exports = PlaceShips;