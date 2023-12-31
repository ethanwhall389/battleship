class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit(vertCoord, horzCoord) {
        this.hits++;
        // this.hits.push([vertCoord, horzCoord]);
        this.isSunk();
    }

    //WORK on checking for hits
    hitExists(hitsArray, vertCoord, horzCoord) {
        hitsArray.some(arr => {

        })
    }

    isSunk() {
        if (this.hits < this.length) {
            this.sunk = false;
            return false;
        } else {
            this.sunk = true;
            return true;
        }
    }

    getHitNum() {
        return this.hits.length;
    }
}

module.exports = Ship;