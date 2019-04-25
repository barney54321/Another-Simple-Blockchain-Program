var sha = require("sha256");

class Block {
    constructor(name, prev, value, index) {
        this.name = name;
        this.prev = prev;
        this.value = value;
        this.index = index;
        this.hash = this.getHash();
    }

    getHash () {
        return sha(this.name + this.value + this.prev + this.index);
    }
}

module.exports = Block;