class Block {
	constructor({ timestamp, lastHash, hash, data }) { //passing an object and destructuring in constructor prevents erros by assiging values in wrong order.
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}
}

module.exports = Block;
