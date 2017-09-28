const config = require('../config');
const wallContract = require('./wallContract');
const Message = require('../models/message');

const web3 = require('./web3');

module.exports = {
	start: function(callback) {
		console.log('watcher started');
		wallContract.subscribe(async event => {
			let txId = event.transactionHash;
			let transaction = await wallContract.getTransaction(txId);
			let storedMessage = await Message.add(transaction);
			callback({
				event: event,
				transaction: transaction,
				storedMessage: storedMessage
			})
		});
	}
};
