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
            // setTimeout( () => {
            //     resolve();
            // }, 10000);
        })
    }
}



module.exports = PlaceShips;