const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

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

	describe('mineBlock()', () => {
		/**
		 * const GENESIS_DATA = {
			timestamp: 1,
			lastHash: '-',
			hash: 'hash-one',
			data: [],
			};
		 */
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const mineBlock = Block.mineBlock({ lastBlock, data });
		it('returns a Block instance', () => {
			expect(mineBlock).toBeInstanceOf(Block);
		})
		it('sets the `lastHash` to be the `hash of the lastBlock', () => {
			expect(mineBlock.lastHash).toEqual(lastBlock.hash);
		})
		it('sets the `data`', () => {
			expect(mineBlock.data).toEqual(data);
		})
		it('sets the `timestamp`', () => {
			expect(mineBlock.timestamp).not.toEqual(undefined);
		})
		it('creates a SHA-256 `hash` based on the proper input', () => {
			expect(mineBlock.hash).toEqual(cryptoHash(mineBlock.timestamp, lastBlock.hash, data));
		})
	})
})
