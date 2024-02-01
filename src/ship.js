class Ship {
    constructor(name, length, orientation) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.axis = orientation;
        console.log('new ship created named: ' +this.name);
    }

    hit(vertCoord, horzCoord) {
        this.hits++;
        // this.hits.push([vertCoord, horzCoord]);
        this.isSunk();
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