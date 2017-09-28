var _ = require('lodash');

var defaults = {
	'port': 3000,
	'etherscanKey': '',
	'contractAddress': '0xd2f3687e7d22ba9390a12d6ab56379e314ed06a0',
	'fromAddress': '',
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
