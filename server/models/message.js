const mongoose = require('mongoose');
const wallContract = require('../lib/wallContract');

const MessageSchema = new mongoose.Schema(
	{
		sender: {
			type: String,
			required: true
		},
		content: {
			type: Object
		},
		transactionId: {
			type: String,
			required: true
		},
		blockNumber: {
			type: Number,
			required: true
		},
		transaction: {
			type: Object
		},
	},
	{
		timestamps: true
	}
);

MessageSchema.statics.findList = async function() {
	return await this.find().sort({blockNumber: -1}).limit(50);
};

MessageSchema.statics.getByTxId = async function(txId) {
	let message = await this.findOne({transactionId: txId});
	return message;
};

MessageSchema.statics.add = async function(transaction) {
	let Message = this;

	let sender = transaction.from;
	let transactionId = transaction.hash;
	let blockNumber = transaction.blockNumber;
	let content = wallContract.decodeInput(transaction.input);

	let existingMessage = await this.getByTxId(transactionId);
	if (existingMessage) {
		console.log(existingMessage);
		return null;
	}

	let messageData = {
		sender: sender,
		content: content,
		transactionId: transactionId,
		transaction: transaction,
		blockNumber: blockNumber
	};
	let newMessage = new Message(messageData);
	return newMessage.save();
};

MessageSchema.statics.importPast = async function() {
	let pastEvents = await wallContract.getPastEvents();
	let imported = [];
	for (let event of pastEvents) {
		let transaction = await wallContract.getTransaction(event.transactionHash);
		let storedMessage = await this.add(transaction);
		imported.push(storedMessage);
	}
	return imported;
}

module.exports = mongoose.model('Message', MessageSchema);
