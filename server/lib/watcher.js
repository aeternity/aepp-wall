const Web3 = require('web3');
const InputDataDecoder = require('ethereum-input-data-decoder');
const config = require('../config');
const wallContract = require('./wallContract');

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

let getTransaction = async function(txId) {
	return await web3.eth.getTransaction(txId);
};

let decodeInput = function(input) {
	const abi = require('../../contract/build/contracts/AeternityWall.json').abi;
	const decoder = new InputDataDecoder(abi);
	return decoder.decodeData(input);
}

module.exports = {
	start: function(callback) {
		console.log('watcher started');
		wallContract.subscribe(async event => {
			let txId = event.transactionHash;
			let transaction = await getTransaction(txId);
			let input = decodeInput(transaction.input);
			callback({
				event: event,
				transaction: transaction,
				input: input
			})
		});

		// web3.eth.subscribe('logs', {
		// 	address: config.contractAddress,
		// },
		// async (err, result) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	let txId = result.transactionHash;
		// 	let transaction = await getTransaction(txId);
		// 	let input = decodeInput(transaction.input);
		// 	callback(input)
		// });
	}
};
