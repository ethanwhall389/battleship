class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
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
}

module.exports = Ship;