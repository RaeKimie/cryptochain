const crypto = require('crypto');

/**
crypto.createHash(algorithm, options)
Creates and returns a Hash object that can be used to generate hash digests using the given algorithm.
Optional options argument controls stream behavior. For XOF hash functions such as 'shake256', the outputLength option can be used to specify the desired output length in bytes.

hash.update(data, inputEncoidng)
데이터로 해쉬 값을 업데이트함. 인코딩 값이 없으면 스트링이 반환됨('utf8'). data 값이 buffer인 경우에는 인코딩값은 무시됨.

hash.digest(encoding)
encoding: the encoding of the return value
returns buffer/string

업데이트 매소드를 통해서 받은 모든 데이터를 계산함. 인코딩 값이 주어지면 string 값이 반환됨. otherwise returns buffer
다이제스트가 사용되면 보통 그 이후에는 사용 불가능.
*/
const cryptoHash = (...inputs) => {
	const joinInputs = inputs.sort().join(' ');
	const hash = crypto.createHash('sha256');

	hash.update(joinInputs);

	return hash.digest('hex');
};

module.exports = cryptoHash;
