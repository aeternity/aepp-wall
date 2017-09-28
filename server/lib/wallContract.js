const InputDataDecoder = require('ethereum-input-data-decoder');
const config = require('../config');

const web3 = require('./web3');

const contractAddress = config.contractAddress;
const contractJson = require('../../contract/build/contracts/AeternityWall.json');
const Contract = new web3.eth.Contract(contractJson.abi, contractAddress);

module.exports = {
	store: async function(key, value) {
		let from = config.fromAddress;

		let method = Contract.methods.store(key, value);
		let estimate = await method.estimateGas({
			from: from
		});
		console.log('estimate', estimate);
		let result = await method.send({
			from: from,
			gas: estimate,
			gasPrice: 2000000000
		});
		return result;
	},
	getPastEvents: async function() {
		return await Contract.getPastEvents('Stored', {
			fromBlock: 0,
			toBlock: 'latest'
		});
	},
	subscribe: function(callback) {
		Contract.events.Stored((err, event) => {
			if (!err) {
				return callback(event);
			}
		});
	},
	decodeInput: function(input) {
		const decoder = new InputDataDecoder(contractJson.abi);
		return decoder.decodeData(input);
	},
	getTransaction: async function(txId) {
		return await web3.eth.getTransaction(txId);
	}
};
