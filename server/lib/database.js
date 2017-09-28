var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = global.Promise;

var connStr = process.env.MONGODB_URI || config.database;
var connOpt = config.database_options;
mongoose.connect(connStr, connOpt, function(err) {
	if (err) throw err;
	console.log('Successfully connected to MongoDB');
});

module.exports = mongoose;
