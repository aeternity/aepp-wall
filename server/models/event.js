const wallContract = require('../lib/wallContract');
const Message = require('./message');

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
	switch (event.event) {
		case 'Approval':
			return await handleApprovalEvent(event);
		case 'Stored':
			return await handleStoredEvent(event);
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

let handleStoredEvent = async function(event) {
	let txId = event.transactionHash;
	let transaction = await wallContract.getTransaction(txId);
	let block = await wallContract.getBlock(transaction.blockNumber);
	let content = wallContract.decodeInput(transaction.input);

	if (content && content.inputs && content.inputs.length == 2) {
		switch (content.inputs[0]) {
			case 'message':
				return await handleMessageEvent(transaction, block, content.inputs[1]);
				break;
		}
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
	handleStoredEvent: handleStoredEvent
};
