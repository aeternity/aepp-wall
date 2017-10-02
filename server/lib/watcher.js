const config = require('../config');
const wallContract = require('./wallContract');
const Event = require('../models/event');

const web3 = require('./web3');

module.exports = {
	start: function(callback) {
		console.log('watcher started');
		wallContract.subscribe(async event => {
			let result = await Event.handleEvent(event);
			callback(null, result);
		});
	}
};
