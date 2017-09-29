module.exports = function(web3, contractAddress) {
	let contractJson = require('../../contract/build/contracts/AeternityWall.json');
	return new web3.eth.Contract(contractJson.abi, contractAddress);
};
