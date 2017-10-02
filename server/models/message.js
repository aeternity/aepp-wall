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
		blockTimestamp: {
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

MessageSchema.statics.add = async function(transaction, block, value) {
	let Message = this;

	let sender = transaction.from;
	let transactionId = transaction.hash;
	let blockNumber = transaction.blockNumber;
	let blockTimestamp = block.timestamp;
	let content = value;

	let existingMessage = await this.getByTxId(transactionId);
	if (existingMessage) {
		return null;
	}

	let messageData = {
		sender: sender,
		content: content,
		transactionId: transactionId,
		transaction: transaction,
		blockNumber: blockNumber,
		blockTimestamp: blockTimestamp
	};
	let newMessage = new Message(messageData);
	return await newMessage.save();
};

module.exports = mongoose.model('Message', MessageSchema);
