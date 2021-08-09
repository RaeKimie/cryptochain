const Block = require('./block');
const cryptoHash = require('./crypto-hash');
class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
	}

	//add new block to chain
	addBlock({ data }) {
		const lastBlock = this.chain[this.chain.length-1];
		const newBlock = Block.mineBlock({ lastBlock, data});
		this.chain.push(newBlock);
	}

	static isValidChain(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}
		for (let i = 1; i < chain.length; i++){
			const {timestamp, lastHash, hash, data} = chain[i];
			const actualLastHash = chain[i-1].hash;

			if ( lastHash !== actualLastHash) {
				return false;
			}
			if ( Object.keys(chain[i]).length > 4) {
				return false;
			}

			const validHash = cryptoHash(timestamp, lastHash, data);
			if (hash !== validHash) {

			return false;
			}
		}

		return true;
	}
}

module.exports = Blockchain;
