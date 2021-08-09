const Blockchain = require('./blockchain');
const Block = require('./block');
describe('Blockchain', () => {
	let blockchain;
	beforeEach(() => {
		//each test has new instance so that it doesn't contain any modified data
		blockchain = new Blockchain();
	})
	it('contains a `chain` Array instance', () => {
		expect(blockchain.chain instanceof Array).toBe(true);
	})

	it('starts with the genesis block', () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	})

	it('adds a new block to the chain', () => {
		const newData = 'foo bar';
		blockchain.addBlock({ data: newData });
		expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
	})

	describe('isValidChain()', () => {
		describe('when the chain does not start with the genesis block', () => {
			it('returns false', () => {
				blockchain.chain[0] = {data: 'fake-genesis'};

				expect(Blockchain.isValidChain(blockchain.chain)).toEqual(false);
			});
		})
		describe('when the chain starts with the genesis block and has multiple blocks', () => {
			beforeEach(() => {
				blockchain.addBlock({ data: 'Bears'});
				blockchain.addBlock({ data: 'Bears2'});
				blockchain.addBlock({ data: 'Bears3'});
			})
			describe('and a lastHash reference has changed', () => {
				it('returns false', () => {
					//modify data
					blockchain.chain[2].lastHash = 'changed new hash';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});
			describe('and the chain contains a block with an extra field', () => {
				it('returns false', () => {
					//modify data
					blockchain.chain[2].extra = 'random';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
					
				});
			});
			describe('and the chain contains a block with an invalid hash', () => {
				it('returns false', () => {
					//modify data
					blockchain.chain[2].data = 'fake data';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
					
				})
			});
			describe('and the chain does not contain any invalid blocks', () => {
				it('returns true', () => {
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
				});
			});
		});
	});
});
