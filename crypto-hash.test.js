const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
	it('should generate a SHA-256 hashed output', () => {
		expect(cryptoHash('yo')).toEqual('e9058ab198f6908f702111b0c0fb5b36f99d00554521886c40e2891b349dc7a1');
	})

	it('should produce the same hash with the same input arguments in any order', () => {
		expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'one', 'two'));
	})
})
