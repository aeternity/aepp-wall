const wallContract = require('../lib/wallContract');
const Message = require('./message');
const _ = require('lodash');

let importPast = async function() {
	let pastEvents = await wallContract.getPastEvents();
	console.log('pastEvents', pastEvents);
	let imported = [];
	for (let event of pastEvents) {
		let result = await handleEvent(event);
		if (result) {
			imported.push(result);
		}
	}
	return imported;
};

let handleEvent = async function(event) {
	console.log('handleEvent', event);
	switch (event.event) {
		case 'Approval':
			return await handleApprovalEvent(event);
		case 'Create':
			return await handleCreateEvent(event);
	}
	return null;
};

let handleApprovalEvent = async function(event) {
	let txId = event.transactionHash;
	let transaction = await wallContract.getTransaction(txId);
	let block = await wallContract.getBlock(transaction.blockNumber);
	let content = wallContract.decodeInput(transaction.input);
	console.log(transaction, content);
}

let handleCreateEvent = async function(event) {
	let txId = event.transactionHash;
	let transaction = await wallContract.getTransaction(txId);
	let block = await wallContract.getBlock(transaction.blockNumber);

	console.log('handleCreateEvent');
	console.log(event.returnValues);
	console.log(typeof event.returnValues);
	if (event.returnValues) {
		return await handleMessageEvent(transaction, block, _.pick(event.returnValues, ['_artist', 'message', '_id']));
	}
};

let handleMessageEvent = async function(transaction, block, value) {
	let storedMessage = await Message.add(transaction, block, value);
	return storedMessage;
}

module.exports = {
	importPast: importPast,
	handleEvent: handleEvent,
	handleApprovalEvent: handleApprovalEvent,
	handleCreateEvent: handleCreateEvent
};
