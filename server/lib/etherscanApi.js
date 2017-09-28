const etherscan = require('etherscan-api');
const config = require('../config');
const etherscanApi = etherscan.init(config.etherscanKey, 'kovan');

module.exports = etherscanApi;
