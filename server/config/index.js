var _ = require('lodash');

var defaults = {
	'port': 3000,
	'etherscanKey': '',
	// 'contractAddress': '0xd2f3687e7d22ba9390a12d6ab56379e314ed06a0', // without like
	'contractAddress': '0xbdb60f5a4cd3ca36668404a89b691e7d57589076', // with like
	'tokenContractAddress': '0xcac408fae73b6310a5bcbdc12deb0b3d02a16fb5',
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
