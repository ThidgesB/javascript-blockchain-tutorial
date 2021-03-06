import SHA256 from 'crypto-js/sha256'

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "04/18/2022", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let treehouseCoin = new Blockchain();
treehouseCoin.addBlock(new Block(1, "04/19/2022", {amount: 4}));
treehouseCoin.addBlock(new Block(2, "04/19/2022", {amount: 50}));