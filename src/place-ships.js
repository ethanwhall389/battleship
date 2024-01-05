const DomControl = require('./dom-control');
const EventListeners = require('./event-listeners');

class PlaceShips {
    static userPlaceShips(gameBoard) {
        return new Promise (async resolve => {
            DomControl.showPlaceShipsScreen(gameBoard);
            EventListeners.hoverCoordinates();
            EventListeners.selectShip();
            await EventListeners.completePlacing();
            resolve();
            // setTimeout( () => {
            //     resolve();
            // }, 10000);
        })
    }
}



module.exports = PlaceShips;