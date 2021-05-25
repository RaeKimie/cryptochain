const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
	it('should have a timestamp, lastHash, hash and data property', () => {
		const data = {
			timestamp: 'date',
			lastHash: 'fooLastHash',
			hash: 'foohash',
			data: 'fooData',
		}
		const block = new Block(data);
		expect(block.timestamp).toEqual(data.timestamp);
		expect(block.lastHash).toEqual(data.lastHash);
		expect(block.hash).toEqual(data.hash);
		expect(block.data).toEqual(data.data);
	});

	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		it('should return a Block instance', () => {
			expect(genesisBlock).toBeInstanceOf(Block);
		})
		it('should return the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		})
	})
})
