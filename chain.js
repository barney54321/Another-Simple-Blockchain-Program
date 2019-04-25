var block = require("./block.js")

class BlockChain {
    
    constructor () {
        this.chain = [];
    }

    addBlock (name, value) {
        let index = this.chain.length;
        let prevHash = 0;
        if (index != 0) {
            prevHash = this.chain[index-1].hash;
        }
        let b = new block(name, prevHash, value, index);

        this.chain[index] = b;
    }

    chainIsValid () {
        for (var i = 0; i < this.chain.length; i++) {
            if (this.chain[i].hash != this.chain[i].getHash()) {
                return false;
            }

            if (i > 0 && this.chain[i].prevHash != this.chain[i-1].hash) {
                return false;
            }
        }
        
        return true;
    }

    getLength () {
        return this.chain.length;
    }

    getLast () {
        return this.chain[this.getLength()-1];
    }
}

module.exports = BlockChain;