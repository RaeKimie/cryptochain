const { GENESIS_DATA } = require('./config');
class Block {
	constructor({ timestamp, lastHash, hash, data }) { //passing an object and destructuring in constructor prevents erros by assiging values in wrong order.
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}

	/**
	스태틱 메소드 혹은 프로퍼티는 다른 인스턴스에서는 호출이 불가능하다. 
	스태틱 함수의 경우 오브젝트를 복사하는것과 같은 유틸 용도로 사용되고
	프로퍼티의 경우에는 인스턴스에서 반복하지 않아도 되는 데이터의 저장용도로 사용된다. 캐시에 유용.
	 */
	static genesis() {
		return new this(GENESIS_DATA);
	}
}

module.exports = Block;
