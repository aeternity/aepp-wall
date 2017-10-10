var _ = require('lodash');

var defaults = {
	'port': 3000,
	'etherscanKey': '',
	'contractAddress': '0xb28251ac47d063b967ba4422c7e58a06ddb3a908',
	'tokenContractAddress': '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
	'fromAddress': '',
	'rpcUrl': 'ws://165.227.130.103:18546',
	'database': 'mongodb://localhost:27017/aepp-wall',
	'database_options' : {
		useMongoClient: true
	}
};

function safeRequire(path) {
	try {
		return require(path);
	} catch(error) {
		console.log(error);
		return {};
	}
}

var config = defaults;

switch(process.env.NODE_ENV.toLowerCase()) {
case 'local':
	config = _.merge(defaults, safeRequire('./config-local'));
	break;
case 'dev':
	config = _.merge(defaults, safeRequire('./config-dev'));
	break;
case 'production':
	config = _.merge(defaults, safeRequire('./config-production'));
	break;
}


module.exports = config;
